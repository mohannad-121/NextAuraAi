-- Repair the live request-ID generator used by submit_project_request.
-- Safe to run after the previous migration: no table or existing row is removed.

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
    -- Uses built-in PostgreSQL entropy and a unique-constraint retry below;
    -- it does not depend on the unavailable gen_random_bytes function.
    candidate := format(
      'NA-%s-%s',
      to_char(current_date, 'YYYYMMDD'),
      upper(substr(md5(clock_timestamp()::text || random()::text || txid_current()::text), 1, 6))
    );

    exit when not exists (
      select 1 from public.project_requests where request_id = candidate
    );
  end loop;

  return candidate;
end;
$function$;

create or replace function public.submit_project_request(
  p_full_name text,
  p_phone text,
  p_email text default null,
  p_business_name text default null,
  p_project_type text default null,
  p_package_id text default null,
  p_selected_features jsonb default '[]'::jsonb,
  p_custom_features text default null,
  p_timeline_option text default null,
  p_requested_date date default null,
  p_is_rush boolean default false,
  p_estimated_min_jod numeric default null,
  p_estimated_max_jod numeric default null,
  p_selected_currency text default 'JOD',
  p_converted_min numeric default null,
  p_converted_max numeric default null,
  p_estimate_explanation text default null
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
  if clean_project_type = '' then
    raise exception 'project_request_project_type_required' using errcode = '22023';
  end if;
  if clean_package_id = '' then
    raise exception 'project_request_package_required' using errcode = '22023';
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
