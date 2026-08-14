-- Public review replies with server-enforced English and Arabic profanity filtering.
-- This script is safe to paste into the Supabase SQL Editor once.

create extension if not exists pgcrypto;
create extension if not exists unaccent;

create or replace function public.review_text_is_inappropriate(p_text text)
returns boolean
language plpgsql
stable
set search_path = public, pg_temp
as $function$
declare
  normalized text;
begin
  normalized := unaccent(lower(coalesce(p_text, '')));
  normalized := replace(normalized, 'ـ', '');
  normalized := translate(normalized, 'أإآٱىئؤةگچپڤکی', 'ااااييوهكجبفكي');
  normalized := translate(normalized, '@4301!$57869', 'aaeoiisstugg');
  normalized := regexp_replace(normalized, '[^a-zء-ي]+', '', 'g');

  return normalized ~
    '(f+u+c+k+|b+i+t+c+h+|s+h+i+t+|a+s+s+h+o+l+e+|b+a+s+t+a+r+d+|d+a+m+n+|d+i+c+k+|p+u+s+s+y+|c+u+n+t+|w+h+o+r+e+|n+i+g+g+[ae]+r*|ك+س+|ك+س+م+|ش+ر+م+و+ط+|ز+ب+|ط+ي+ز+|ع+ر+ص+|م+ن+ي+ك+|م+ت+ن+ا+ك+|خ+ر+ا+|ق+ح+ب+|ا+ب+ن+ا+ل+ك+ل+ب+|ي+ل+ع+ن+|ح+ي+و+ا+ن+)';
end
$function$;

revoke all on function public.review_text_is_inappropriate(text) from public;

create table if not exists public.customer_review_replies (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.customer_reviews(id) on delete cascade,
  display_name text,
  comment text not null,
  visitor_id text not null,
  is_visible boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.customer_review_replies
  add column if not exists review_id uuid references public.customer_reviews(id) on delete cascade,
  add column if not exists display_name text,
  add column if not exists comment text,
  add column if not exists visitor_id text,
  add column if not exists is_visible boolean not null default true,
  add column if not exists created_at timestamptz not null default timezone('utc', now());

alter table public.customer_review_replies
  drop constraint if exists customer_review_replies_comment_length_check,
  drop constraint if exists customer_review_replies_display_name_length_check,
  drop constraint if exists customer_review_replies_visitor_id_length_check;

alter table public.customer_review_replies
  add constraint customer_review_replies_comment_length_check
    check (char_length(trim(comment)) between 2 and 500),
  add constraint customer_review_replies_display_name_length_check
    check (display_name is null or char_length(trim(display_name)) between 1 and 80),
  add constraint customer_review_replies_visitor_id_length_check
    check (char_length(visitor_id) between 36 and 80);

create index if not exists customer_review_replies_visible_review_created_at_idx
  on public.customer_review_replies (review_id, created_at asc)
  where is_visible = true;
create index if not exists customer_review_replies_visitor_created_at_idx
  on public.customer_review_replies (visitor_id, created_at desc);

alter table public.customer_review_replies enable row level security;
revoke all on table public.customer_review_replies from public, anon, authenticated;
grant select (id, review_id, display_name, comment, created_at, is_visible)
  on public.customer_review_replies to anon, authenticated;

drop policy if exists "Visible customer review replies are publicly readable" on public.customer_review_replies;
create policy "Visible customer review replies are publicly readable"
  on public.customer_review_replies
  for select
  to anon, authenticated
  using (
    is_visible = true
    and exists (
      select 1
      from public.customer_reviews
      where customer_reviews.id = customer_review_replies.review_id
        and customer_reviews.is_visible = true
    )
  );

create or replace function public.submit_customer_review(
  p_display_name text,
  p_rating smallint,
  p_comment text,
  p_visitor_id text
)
returns table (
  id uuid,
  display_name text,
  rating smallint,
  comment text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
declare
  clean_display_name text;
  clean_comment text;
  recent_review_count integer;
begin
  clean_display_name := nullif(left(trim(regexp_replace(coalesce(p_display_name, ''), '[[:cntrl:]]', ' ', 'g')), 100), '');
  clean_comment := left(trim(regexp_replace(coalesce(p_comment, ''), '[[:cntrl:]]', ' ', 'g')), 800);

  if p_rating is null or p_rating < 1 or p_rating > 5 then
    raise exception 'review_rating_invalid' using errcode = '22023';
  end if;
  if char_length(clean_comment) < 5 then
    raise exception 'review_comment_invalid' using errcode = '22023';
  end if;
  if public.review_text_is_inappropriate(clean_display_name)
    or public.review_text_is_inappropriate(clean_comment) then
    raise exception 'review_text_inappropriate' using errcode = '22023';
  end if;
  if p_visitor_id is null or p_visitor_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    raise exception 'review_visitor_invalid' using errcode = '22023';
  end if;

  select count(*) into recent_review_count
  from public.customer_reviews
  where visitor_id = lower(p_visitor_id)
    and created_at >= timezone('utc', now()) - interval '1 hour';
  if recent_review_count >= 3 then
    raise exception 'review_rate_limited' using errcode = 'P0001';
  end if;

  if exists (
    select 1 from public.customer_reviews
    where visitor_id = lower(p_visitor_id)
      and lower(comment) = lower(clean_comment)
      and created_at >= timezone('utc', now()) - interval '10 minutes'
  ) then
    raise exception 'review_duplicate' using errcode = 'P0001';
  end if;

  return query
  insert into public.customer_reviews (display_name, rating, comment, visitor_id, source_page, is_visible)
  values (clean_display_name, p_rating, clean_comment, lower(p_visitor_id), 'homepage', true)
  returning customer_reviews.id, customer_reviews.display_name, customer_reviews.rating,
    customer_reviews.comment, customer_reviews.created_at;
end
$function$;

create or replace function public.submit_customer_review_reply(
  p_review_id uuid,
  p_display_name text,
  p_comment text,
  p_visitor_id text
)
returns table (
  id uuid,
  review_id uuid,
  display_name text,
  comment text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
declare
  clean_display_name text;
  clean_comment text;
  recent_reply_count integer;
begin
  clean_display_name := nullif(left(trim(regexp_replace(coalesce(p_display_name, ''), '[[:cntrl:]]', ' ', 'g')), 80), '');
  clean_comment := left(trim(regexp_replace(coalesce(p_comment, ''), '[[:cntrl:]]', ' ', 'g')), 500);

  if p_review_id is null or not exists (
    select 1 from public.customer_reviews where id = p_review_id and is_visible = true
  ) then
    raise exception 'review_not_found' using errcode = '22023';
  end if;
  if char_length(clean_comment) < 2 then
    raise exception 'review_reply_invalid' using errcode = '22023';
  end if;
  if public.review_text_is_inappropriate(clean_display_name)
    or public.review_text_is_inappropriate(clean_comment) then
    raise exception 'review_text_inappropriate' using errcode = '22023';
  end if;
  if p_visitor_id is null or p_visitor_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    raise exception 'review_visitor_invalid' using errcode = '22023';
  end if;

  select count(*) into recent_reply_count
  from public.customer_review_replies
  where visitor_id = lower(p_visitor_id)
    and created_at >= timezone('utc', now()) - interval '1 hour';
  if recent_reply_count >= 12 then
    raise exception 'review_reply_rate_limited' using errcode = 'P0001';
  end if;

  if exists (
    select 1 from public.customer_review_replies
    where review_id = p_review_id
      and visitor_id = lower(p_visitor_id)
      and lower(comment) = lower(clean_comment)
      and created_at >= timezone('utc', now()) - interval '10 minutes'
  ) then
    raise exception 'review_reply_duplicate' using errcode = 'P0001';
  end if;

  return query
  insert into public.customer_review_replies (review_id, display_name, comment, visitor_id, is_visible)
  values (p_review_id, clean_display_name, clean_comment, lower(p_visitor_id), true)
  returning customer_review_replies.id, customer_review_replies.review_id,
    customer_review_replies.display_name, customer_review_replies.comment,
    customer_review_replies.created_at;
end
$function$;

revoke all on function public.submit_customer_review(text, smallint, text, text) from public;
revoke all on function public.submit_customer_review_reply(uuid, text, text, text) from public;
grant execute on function public.submit_customer_review(text, smallint, text, text) to anon, authenticated;
grant execute on function public.submit_customer_review_reply(uuid, text, text, text) to anon, authenticated;

notify pgrst, 'reload schema';
