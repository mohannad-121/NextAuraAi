-- Vite browser-client repair for reviews and project requests.
-- Safe to run repeatedly: it never drops a table or deletes rows.

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
  drop constraint if exists customer_reviews_rating_check,
  drop constraint if exists customer_reviews_rating_range,
  drop constraint if exists customer_reviews_comment_length_check,
  drop constraint if exists customer_reviews_comment_length,
  drop constraint if exists customer_reviews_display_name_length_check,
  drop constraint if exists customer_reviews_display_name_length;

alter table public.customer_reviews
  add constraint customer_reviews_rating_check check (rating between 1 and 5) not valid,
  add constraint customer_reviews_comment_length_check
    check (char_length(trim(comment)) between 5 and 800) not valid,
  add constraint customer_reviews_display_name_length_check
    check (display_name is null or char_length(trim(display_name)) <= 100) not valid;

create index if not exists customer_reviews_visible_created_at_idx
  on public.customer_reviews (is_visible, created_at desc);

alter table public.customer_reviews enable row level security;
revoke all on table public.customer_reviews from public, anon, authenticated;
grant select (id, display_name, rating, comment, is_visible, created_at)
  on public.customer_reviews to anon, authenticated;

drop policy if exists "Visible customer reviews are publicly readable" on public.customer_reviews;
create policy "Visible customer reviews are publicly readable"
  on public.customer_reviews
  for select to anon, authenticated
  using (is_visible = true);

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
begin
  clean_display_name := nullif(
    left(trim(regexp_replace(coalesce(p_display_name, ''), '[[:cntrl:]]', ' ', 'g')), 100),
    ''
  );
  clean_comment := left(
    trim(regexp_replace(coalesce(p_comment, ''), '[[:cntrl:]]', ' ', 'g')),
    800
  );

  if p_rating is null or p_rating < 1 or p_rating > 5 then
    raise exception 'review_rating_invalid' using errcode = '22023';
  end if;
  if char_length(clean_comment) < 5 then
    raise exception 'review_comment_invalid' using errcode = '22023';
  end if;

  return query
  insert into public.customer_reviews (
    display_name, rating, comment, visitor_id, is_visible, source_page
  )
  values (
    clean_display_name,
    p_rating,
    clean_comment,
    nullif(lower(trim(p_visitor_id)), ''),
    true,
    'homepage'
  )
  returning
    customer_reviews.id,
    customer_reviews.display_name,
    customer_reviews.rating,
    customer_reviews.comment,
    customer_reviews.created_at;
end;
$function$;

revoke all on function public.get_customer_review_summary() from public;
revoke all on function public.submit_customer_review(text, smallint, text, text) from public;
grant execute on function public.get_customer_review_summary() to anon, authenticated;
grant execute on function public.submit_customer_review(text, smallint, text, text)
  to anon, authenticated;

-- Fresh databases get a UUID primary key. Existing project-request tables are left intact.
create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  request_id text not null unique,
  full_name text not null,
  phone text not null,
  email text,
  business_name text,
  project_type text not null,
  package_id text not null,
  selected_features jsonb not null default '[]'::jsonb,
  custom_features text,
  timeline_option text,
  requested_date date,
  is_rush boolean not null default false,
  estimated_min_jod numeric,
  estimated_max_jod numeric,
  selected_currency text not null default 'JOD',
  converted_min numeric,
  converted_max numeric,
  estimate_explanation text,
  maintenance_months integer not null default 8,
  status text not null default 'new',
  source_page text not null default 'start-project',
  customer_name text,
  customer_phone text,
  customer_email text,
  payload jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.project_requests
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists business_name text,
  add column if not exists project_type text,
  add column if not exists package_id text,
  add column if not exists selected_features jsonb not null default '[]'::jsonb,
  add column if not exists custom_features text,
  add column if not exists timeline_option text,
  add column if not exists requested_date date,
  add column if not exists is_rush boolean not null default false,
  add column if not exists estimated_min_jod numeric,
  add column if not exists estimated_max_jod numeric,
  add column if not exists selected_currency text not null default 'JOD',
  add column if not exists converted_min numeric,
  add column if not exists converted_max numeric,
  add column if not exists estimate_explanation text,
  add column if not exists maintenance_months integer not null default 8,
  add column if not exists status text not null default 'new',
  add column if not exists source_page text not null default 'start-project',
  add column if not exists customer_name text,
  add column if not exists customer_phone text,
  add column if not exists customer_email text,
  add column if not exists payload jsonb not null default '{}'::jsonb,
  add column if not exists submitted_at timestamptz not null default timezone('utc', now()),
  add column if not exists created_at timestamptz not null default timezone('utc', now());

do $migration$
declare
  constraint_name text;
begin
  for constraint_name in
    select conname
    from pg_constraint
    where conrelid = 'public.project_requests'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) ilike '%request_id%'
  loop
    execute format('alter table public.project_requests drop constraint %I', constraint_name);
  end loop;
end;
$migration$;

alter table public.project_requests
  drop constraint if exists project_requests_request_id_format_check,
  drop constraint if exists project_requests_full_name_check,
  drop constraint if exists project_requests_phone_check,
  drop constraint if exists project_requests_maintenance_months_check,
  drop constraint if exists project_requests_estimate_range_check,
  drop constraint if exists project_requests_selected_features_array_check;

alter table public.project_requests
  add constraint project_requests_request_id_format_check
    check (request_id ~ '^(NA-[0-9]{8}-[A-Z0-9]{6}|NXA-[0-9]{8}-[A-F0-9]{8})$') not valid,
  add constraint project_requests_full_name_check
    check (full_name is null or char_length(trim(full_name)) > 0) not valid,
  add constraint project_requests_phone_check
    check (phone is null or char_length(trim(phone)) > 0) not valid,
  add constraint project_requests_maintenance_months_check
    check (maintenance_months >= 0) not valid,
  add constraint project_requests_estimate_range_check
    check (
      estimated_min_jod is null or estimated_max_jod is null
      or estimated_max_jod >= estimated_min_jod
    ) not valid,
  add constraint project_requests_selected_features_array_check
    check (jsonb_typeof(selected_features) = 'array') not valid;

create index if not exists project_requests_created_at_idx
  on public.project_requests (created_at desc);

create or replace function public.generate_project_request_id()
returns text
language plpgsql
volatile
set search_path = public, pg_temp
as $function$
declare
  candidate text;
begin
  loop
    candidate := format(
      'NA-%s-%s',
      to_char(current_date, 'YYYYMMDD'),
      upper(substr(encode(gen_random_bytes(4), 'hex'), 1, 6))
    );
    exit when not exists (
      select 1 from public.project_requests where request_id = candidate
    );
  end loop;
  return candidate;
end;
$function$;

drop function if exists public.submit_project_request(
  text, text, text, text, text, text, jsonb, text, text, date, boolean,
  numeric, numeric, text, numeric, numeric, text
);

create function public.submit_project_request(
  p_full_name text,
  p_phone text,
  p_email text,
  p_business_name text,
  p_project_type text,
  p_package_id text,
  p_selected_features jsonb,
  p_custom_features text,
  p_timeline_option text,
  p_requested_date date,
  p_is_rush boolean,
  p_estimated_min_jod numeric,
  p_estimated_max_jod numeric,
  p_selected_currency text,
  p_converted_min numeric,
  p_converted_max numeric,
  p_estimate_explanation text
)
returns table (id text, request_id text, created_at timestamptz)
language plpgsql
security definer
set search_path = public, pg_temp
as $function$
declare
  clean_full_name text;
  clean_phone text;
  clean_email text;
  clean_business_name text;
  clean_project_type text;
  clean_package_id text;
  clean_custom_features text;
  clean_timeline_option text;
  clean_currency text;
  clean_explanation text;
  generated_request_id text;
  saved_id text;
  saved_created_at timestamptz;
  attempt integer;
begin
  clean_full_name := left(trim(regexp_replace(coalesce(p_full_name, ''), '[[:cntrl:]]', ' ', 'g')), 120);
  clean_phone := left(trim(regexp_replace(coalesce(p_phone, ''), '[[:cntrl:]]', ' ', 'g')), 32);
  clean_email := nullif(left(trim(regexp_replace(coalesce(p_email, ''), '[[:cntrl:]]', ' ', 'g')), 160), '');
  clean_business_name := nullif(left(trim(regexp_replace(coalesce(p_business_name, ''), '[[:cntrl:]]', ' ', 'g')), 160), '');
  clean_project_type := left(trim(regexp_replace(coalesce(p_project_type, ''), '[[:cntrl:]]', ' ', 'g')), 80);
  clean_package_id := left(trim(regexp_replace(coalesce(p_package_id, ''), '[[:cntrl:]]', ' ', 'g')), 80);
  clean_custom_features := nullif(left(trim(regexp_replace(coalesce(p_custom_features, ''), '[[:cntrl:]]', ' ', 'g')), 2000), '');
  clean_timeline_option := nullif(left(trim(regexp_replace(coalesce(p_timeline_option, ''), '[[:cntrl:]]', ' ', 'g')), 80), '');
  clean_currency := coalesce(nullif(upper(left(trim(p_selected_currency), 8)), ''), 'JOD');
  clean_explanation := nullif(left(trim(regexp_replace(coalesce(p_estimate_explanation, ''), '[[:cntrl:]]', ' ', 'g')), 1500), '');

  if clean_full_name = '' then
    raise exception 'project_request_full_name_required' using errcode = '22023';
  end if;
  if clean_phone = '' then
    raise exception 'project_request_phone_required' using errcode = '22023';
  end if;
  if clean_project_type = '' or clean_package_id = '' then
    raise exception 'project_request_project_details_required' using errcode = '22023';
  end if;
  if p_selected_features is null or jsonb_typeof(p_selected_features) <> 'array' then
    raise exception 'project_request_selected_features_invalid' using errcode = '22023';
  end if;
  if p_estimated_max_jod is not null and p_estimated_min_jod is not null
    and p_estimated_max_jod < p_estimated_min_jod then
    raise exception 'project_request_estimate_range_invalid' using errcode = '22023';
  end if;

  for attempt in 1..5 loop
    generated_request_id := public.generate_project_request_id();
    begin
      insert into public.project_requests (
        request_id, full_name, phone, email, business_name, project_type,
        package_id, selected_features, custom_features, timeline_option,
        requested_date, is_rush, estimated_min_jod, estimated_max_jod,
        selected_currency, converted_min, converted_max, estimate_explanation,
        maintenance_months, status, source_page, customer_name, customer_phone,
        customer_email, payload, submitted_at
      ) values (
        generated_request_id, clean_full_name, clean_phone, clean_email,
        clean_business_name, clean_project_type, clean_package_id,
        p_selected_features, clean_custom_features, clean_timeline_option,
        p_requested_date, coalesce(p_is_rush, false), p_estimated_min_jod,
        p_estimated_max_jod, clean_currency, p_converted_min, p_converted_max,
        clean_explanation, 8, 'new', 'start-project', clean_full_name,
        clean_phone, clean_email,
        jsonb_build_object(
          'request_id', generated_request_id,
          'project_type', clean_project_type,
          'package_id', clean_package_id,
          'selected_features', p_selected_features,
          'maintenance_months', 8,
          'status', 'new',
          'source_page', 'start-project'
        ),
        timezone('utc', now())
      )
      returning project_requests.id::text, project_requests.created_at
        into saved_id, saved_created_at;

      return query select saved_id, generated_request_id, saved_created_at;
      return;
    exception when unique_violation then
      if attempt = 5 then raise; end if;
    end;
  end loop;
end;
$function$;

alter table public.project_requests enable row level security;
revoke all on table public.project_requests from public, anon, authenticated;
revoke all on function public.generate_project_request_id() from public, anon, authenticated;
revoke all on function public.submit_project_request(
  text, text, text, text, text, text, jsonb, text, text, date, boolean,
  numeric, numeric, text, numeric, numeric, text
) from public;
grant execute on function public.submit_project_request(
  text, text, text, text, text, text, jsonb, text, text, date, boolean,
  numeric, numeric, text, numeric, numeric, text
) to anon, authenticated;

notify pgrst, 'reload schema';
