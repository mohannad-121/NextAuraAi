create table if not exists public.website_visits (
  id bigint generated always as identity primary key,
  visitor_hash text not null,
  visited_at timestamptz not null default now(),
  page text not null default '/',
  user_agent text not null default ''
);

create index if not exists website_visits_visitor_hash_visited_at_idx
  on public.website_visits (visitor_hash, visited_at desc);

alter table public.website_visits enable row level security;

revoke all on table public.website_visits from anon, authenticated;
grant select, insert on table public.website_visits to service_role;

create or replace function public.register_website_visit(
  p_visitor_hash text,
  p_page text,
  p_user_agent text
)
returns table (real_unique_count bigint, registered boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  was_registered boolean := false;
begin
  if p_visitor_hash is null or length(p_visitor_hash) <> 64 then
    raise exception 'Invalid visitor hash';
  end if;

  -- Serialize requests for the same hash so simultaneous page loads cannot double count.
  perform pg_advisory_xact_lock(hashtextextended(p_visitor_hash, 0));

  if not exists (
    select 1
    from public.website_visits
    where visitor_hash = p_visitor_hash
      and visited_at >= now() - interval '24 hours'
  ) then
    insert into public.website_visits (visitor_hash, page, user_agent)
    values (
      p_visitor_hash,
      left(coalesce(nullif(p_page, ''), '/'), 160),
      left(coalesce(p_user_agent, ''), 512)
    );
    was_registered := true;
  end if;

  return query
    select count(*)::bigint, was_registered
    from public.website_visits;
end;
$$;

revoke all on function public.register_website_visit(text, text, text)
  from public, anon, authenticated;
grant execute on function public.register_website_visit(text, text, text)
  to service_role;
