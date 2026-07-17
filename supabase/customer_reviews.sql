-- Run once in the existing Supabase SQL editor.
-- Public visitors read visible fields only. All inserts are validated by the server API.

create extension if not exists pgcrypto;

create table if not exists public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  rating smallint not null,
  comment text not null,
  is_visible boolean not null default true,
  visitor_id text not null,
  source_page text not null default 'homepage',
  created_at timestamptz not null default timezone('utc', now()),
  constraint customer_reviews_rating_range check (rating between 1 and 5),
  constraint customer_reviews_display_name_length check (
    display_name is null or char_length(trim(display_name)) between 1 and 80
  ),
  constraint customer_reviews_comment_length check (
    char_length(trim(comment)) between 5 and 800
  ),
  constraint customer_reviews_visitor_id_length check (
    char_length(visitor_id) between 36 and 80
  ),
  constraint customer_reviews_source_page_length check (
    char_length(source_page) between 1 and 80
  )
);

create index if not exists customer_reviews_created_at_idx
  on public.customer_reviews (created_at desc);

create index if not exists customer_reviews_visible_created_at_idx
  on public.customer_reviews (is_visible, created_at desc);

create index if not exists customer_reviews_visitor_created_at_idx
  on public.customer_reviews (visitor_id, created_at desc);

alter table public.customer_reviews enable row level security;

revoke all on table public.customer_reviews from public, anon, authenticated;
grant select (id, display_name, rating, comment, created_at)
  on public.customer_reviews to anon, authenticated;
grant select, insert, update on table public.customer_reviews to service_role;

drop policy if exists "Visible customer reviews are publicly readable"
  on public.customer_reviews;
create policy "Visible customer reviews are publicly readable"
  on public.customer_reviews
  for select
  to anon, authenticated
  using (is_visible = true);

create or replace function public.get_customer_review_summary()
returns table (total_count bigint, average_rating numeric)
language sql
stable
security definer
set search_path = public, pg_temp
as $function$
  select
    count(*)::bigint as total_count,
    coalesce(round(avg(rating)::numeric, 2), 0::numeric) as average_rating
  from public.customer_reviews
  where is_visible = true;
$function$;

revoke all on function public.get_customer_review_summary()
  from public, anon, authenticated;
grant execute on function public.get_customer_review_summary()
  to service_role;

notify pgrst, 'reload schema';

-- Moderation example (run only by a database administrator):
-- update public.customer_reviews set is_visible = false where id = '<review-uuid>';
