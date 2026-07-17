-- Run once in the existing Supabase SQL editor.
-- This replaces refresh/IP-window counting with persistent browser-level unique visitors.

create table if not exists public.site_visitors (
  visitor_id text primary key,
  first_seen_at timestamptz not null default timezone('utc', now()),
  last_seen_at timestamptz not null default timezone('utc', now()),
  visit_count bigint not null default 1 check (visit_count >= 1),
  first_path text,
  last_path text,
  user_agent_category text,
  constraint site_visitors_identifier_length check (char_length(visitor_id) between 36 and 80),
  constraint site_visitors_first_path_length check (
    first_path is null or char_length(first_path) <= 160
  ),
  constraint site_visitors_last_path_length check (
    last_path is null or char_length(last_path) <= 160
  )
);

create index if not exists site_visitors_last_seen_at_idx
  on public.site_visitors (last_seen_at desc);

alter table public.site_visitors enable row level security;

revoke all on table public.site_visitors from public, anon, authenticated;
grant select, insert, update on table public.site_visitors to service_role;

-- Preserve genuine historical unique hashes if the previous visit-event table exists.
-- Repeated rows for the same hash become one legacy visitor instead of inflating the total.
do $migration$
begin
  if to_regclass('public.website_visits') is not null then
    execute $sql$
      insert into public.site_visitors (
        visitor_id,
        first_seen_at,
        last_seen_at,
        visit_count,
        first_path,
        last_path
      )
      select
        'legacy:' || visitor_hash,
        min(visited_at),
        max(visited_at),
        count(*)::bigint,
        min(page),
        max(page)
      from public.website_visits
      where visitor_hash is not null and char_length(visitor_hash) between 32 and 72
      group by visitor_hash
      on conflict (visitor_id) do nothing
    $sql$;
  end if;
end
$migration$;

create or replace function public.register_site_visitor(
  visitor_identifier text,
  current_path text default '/'
)
returns table (unique_count bigint, is_new boolean)
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
declare
  normalized_path text;
  was_new boolean;
begin
  if visitor_identifier is null or visitor_identifier !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    raise exception 'invalid visitor identifier' using errcode = '22023';
  end if;

  normalized_path := left(coalesce(nullif(trim(current_path), ''), '/'), 160);
  if left(normalized_path, 1) <> '/' or left(normalized_path, 2) = '//' then
    normalized_path := '/';
  end if;

  insert into public.site_visitors (
    visitor_id,
    first_path,
    last_path
  )
  values (
    lower(visitor_identifier),
    normalized_path,
    normalized_path
  )
  on conflict (visitor_id) do update set
    last_seen_at = timezone('utc', now()),
    visit_count = public.site_visitors.visit_count + 1,
    last_path = excluded.last_path
  returning (xmax = 0) into was_new;

  return query
  select (select count(*)::bigint from public.site_visitors), was_new;
end
$function$;

revoke all on function public.register_site_visitor(text, text) from public, anon, authenticated;
grant execute on function public.register_site_visitor(text, text) to service_role;

notify pgrst, 'reload schema';
