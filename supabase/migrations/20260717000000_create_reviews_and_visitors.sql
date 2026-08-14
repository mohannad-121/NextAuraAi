-- NextAura AI public reviews and browser-level unique visitors.
-- Run this complete file once in the target Supabase project's SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  rating smallint not null,
  comment text not null,
  is_visible boolean not null default true,
  visitor_id text,
  source_page text not null default 'homepage',
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.customer_reviews
  add column if not exists display_name text,
  add column if not exists rating smallint,
  add column if not exists comment text,
  add column if not exists is_visible boolean not null default true,
  add column if not exists visitor_id text,
  add column if not exists source_page text not null default 'homepage',
  add column if not exists created_at timestamptz not null default timezone('utc', now());

alter table public.customer_reviews
  alter column visitor_id drop not null,
  alter column source_page set default 'homepage',
  alter column is_visible set default true,
  alter column created_at set default timezone('utc', now());

alter table public.customer_reviews
  drop constraint if exists customer_reviews_rating_range,
  drop constraint if exists customer_reviews_rating_check,
  drop constraint if exists customer_reviews_comment_length,
  drop constraint if exists customer_reviews_comment_length_check,
  drop constraint if exists customer_reviews_display_name_length,
  drop constraint if exists customer_reviews_display_name_length_check,
  drop constraint if exists customer_reviews_visitor_id_length,
  drop constraint if exists customer_reviews_visitor_id_length_check,
  drop constraint if exists customer_reviews_source_page_length,
  drop constraint if exists customer_reviews_source_page_length_check;

alter table public.customer_reviews
  add constraint customer_reviews_rating_check check (rating between 1 and 5),
  add constraint customer_reviews_comment_length_check
    check (char_length(trim(comment)) between 5 and 800),
  add constraint customer_reviews_display_name_length_check
    check (display_name is null or char_length(trim(display_name)) between 1 and 100),
  add constraint customer_reviews_visitor_id_length_check
    check (visitor_id is null or char_length(visitor_id) between 36 and 80),
  add constraint customer_reviews_source_page_length_check
    check (char_length(source_page) between 1 and 80);

create index if not exists customer_reviews_created_at_idx
  on public.customer_reviews (created_at desc);
create index if not exists customer_reviews_visible_created_at_idx
  on public.customer_reviews (is_visible, created_at desc);
create index if not exists customer_reviews_visitor_created_at_idx
  on public.customer_reviews (visitor_id, created_at desc);

alter table public.customer_reviews enable row level security;
revoke all on table public.customer_reviews from public, anon, authenticated;
grant select (id, display_name, rating, comment, created_at, is_visible)
  on public.customer_reviews to anon, authenticated;

drop policy if exists "Visible customer reviews are publicly readable" on public.customer_reviews;
create policy "Visible customer reviews are publicly readable"
  on public.customer_reviews
  for select
  to anon, authenticated
  using (is_visible = true);

drop function if exists public.get_customer_review_summary();
drop function if exists public.submit_customer_review(text, smallint, text, text);

create or replace function public.get_customer_review_summary()
returns table (total_reviews bigint, average_rating numeric)
language sql
stable
security definer
set search_path = public, pg_temp
as $function$
  select
    count(*)::bigint as total_reviews,
    coalesce(round(avg(rating)::numeric, 2), 0::numeric) as average_rating
  from public.customer_reviews
  where is_visible = true;
$function$;

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
  if p_visitor_id is null or p_visitor_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    raise exception 'review_visitor_invalid' using errcode = '22023';
  end if;

  select count(*)
  into recent_review_count
  from public.customer_reviews
  where visitor_id = lower(p_visitor_id)
    and created_at >= timezone('utc', now()) - interval '1 hour';
  if recent_review_count >= 3 then
    raise exception 'review_rate_limited' using errcode = 'P0001';
  end if;

  if exists (
    select 1
    from public.customer_reviews
    where visitor_id = lower(p_visitor_id)
      and lower(comment) = lower(clean_comment)
      and created_at >= timezone('utc', now()) - interval '10 minutes'
  ) then
    raise exception 'review_duplicate' using errcode = 'P0001';
  end if;

  return query
  insert into public.customer_reviews (
    display_name,
    rating,
    comment,
    visitor_id,
    source_page,
    is_visible
  )
  values (
    clean_display_name,
    p_rating,
    clean_comment,
    lower(p_visitor_id),
    'homepage',
    true
  )
  returning
    customer_reviews.id,
    customer_reviews.display_name,
    customer_reviews.rating,
    customer_reviews.comment,
    customer_reviews.created_at;
end
$function$;

revoke all on function public.get_customer_review_summary() from public;
revoke all on function public.submit_customer_review(text, smallint, text, text) from public;
grant execute on function public.get_customer_review_summary() to anon, authenticated;
grant execute on function public.submit_customer_review(text, smallint, text, text)
  to anon, authenticated;

create table if not exists public.site_visitors (
  visitor_id text primary key,
  first_seen_at timestamptz not null default timezone('utc', now()),
  last_seen_at timestamptz not null default timezone('utc', now()),
  visit_count bigint not null default 1,
  first_path text,
  last_path text,
  constraint site_visitors_identifier_length_check check (char_length(visitor_id) between 36 and 80),
  constraint site_visitors_first_path_length_check check (
    first_path is null or char_length(first_path) <= 160
  ),
  constraint site_visitors_last_path_length_check check (
    last_path is null or char_length(last_path) <= 160
  ),
  constraint site_visitors_visit_count_check check (visit_count >= 1)
);

alter table public.site_visitors
  add column if not exists first_seen_at timestamptz not null default timezone('utc', now()),
  add column if not exists last_seen_at timestamptz not null default timezone('utc', now()),
  add column if not exists visit_count bigint not null default 1,
  add column if not exists first_path text,
  add column if not exists last_path text;

create index if not exists site_visitors_last_seen_at_idx
  on public.site_visitors (last_seen_at desc);

alter table public.site_visitors enable row level security;
revoke all on table public.site_visitors from public, anon, authenticated;

drop function if exists public.register_site_visitor(text, text);

create or replace function public.register_site_visitor(
  p_visitor_id text,
  p_path text default '/'
)
returns table (total_count bigint, is_new boolean)
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
declare
  clean_path text;
  was_new boolean;
begin
  if p_visitor_id is null or p_visitor_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    raise exception 'visitor_identifier_invalid' using errcode = '22023';
  end if;

  clean_path := left(coalesce(nullif(trim(p_path), ''), '/'), 160);
  if left(clean_path, 1) <> '/' or left(clean_path, 2) = '//' or position(chr(92) in clean_path) > 0 then
    clean_path := '/';
  end if;

  insert into public.site_visitors (visitor_id, first_path, last_path)
  values (lower(p_visitor_id), clean_path, clean_path)
  on conflict (visitor_id) do update set
    last_seen_at = timezone('utc', now()),
    last_path = excluded.last_path,
    visit_count = public.site_visitors.visit_count + 1
  returning (xmax = 0) into was_new;

  return query
  select (select count(*)::bigint from public.site_visitors), was_new;
end
$function$;

revoke all on function public.register_site_visitor(text, text) from public;
grant execute on function public.register_site_visitor(text, text) to anon, authenticated;

notify pgrst, 'reload schema';

-- Moderation example for a database administrator:
-- update public.customer_reviews set is_visible = false where id = '<review-uuid>';
