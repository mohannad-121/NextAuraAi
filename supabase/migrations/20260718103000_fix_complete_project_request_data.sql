-- Ensure the existing Start Project fields are persisted as complete, customer-readable data.
-- Safe to run after 20260718_expand_project_request_details.sql; no rows are deleted or overwritten.

alter table public.project_requests
  add column if not exists project_idea text,
  add column if not exists included_features jsonb not null default '[]'::jsonb,
  add column if not exists language_count integer not null default 1,
  add column if not exists contact_method text,
  add column if not exists notes text,
  add column if not exists additional_notes text;

create or replace function public.submit_project_request(
  p_full_name text,
  p_phone text,
  p_email text default null,
  p_business_name text default null,
  p_project_type text default null,
  p_project_idea text default null,
  p_package_id text default null,
  p_included_features jsonb default '[]'::jsonb,
  p_selected_features jsonb default '[]'::jsonb,
  p_custom_features text default null,
  p_language_count integer default 1,
  p_timeline_option text default null,
  p_requested_date date default null,
  p_is_rush boolean default false,
  p_contact_method text default null,
  p_notes text default null,
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
  clean_project_idea text;
  clean_package_id text;
  clean_custom_features text;
  clean_timeline_option text;
  clean_contact_method text;
  clean_notes text;
  clean_currency text;
  clean_explanation text;
  clean_included_features jsonb;
  clean_selected_features jsonb;
  generated_request_id text;
  saved_id text;
  saved_created_at timestamptz;
  attempt integer;
begin
  clean_full_name := nullif(trim(regexp_replace(coalesce(p_full_name, ''), '[[:cntrl:]]', ' ', 'g')), '');
  clean_phone := nullif(trim(regexp_replace(coalesce(p_phone, ''), '[[:cntrl:]]', ' ', 'g')), '');
  clean_email := nullif(trim(regexp_replace(coalesce(p_email, ''), '[[:cntrl:]]', ' ', 'g')), '');
  clean_business_name := nullif(trim(regexp_replace(coalesce(p_business_name, ''), '[[:cntrl:]]', ' ', 'g')), '');
  clean_project_type := nullif(trim(regexp_replace(coalesce(p_project_type, ''), '[[:cntrl:]]', ' ', 'g')), '');
  clean_project_idea := nullif(trim(p_project_idea), '');
  clean_package_id := nullif(trim(regexp_replace(coalesce(p_package_id, ''), '[[:cntrl:]]', ' ', 'g')), '');
  clean_custom_features := nullif(trim(p_custom_features), '');
  clean_timeline_option := nullif(trim(regexp_replace(coalesce(p_timeline_option, ''), '[[:cntrl:]]', ' ', 'g')), '');
  clean_contact_method := nullif(trim(regexp_replace(coalesce(p_contact_method, ''), '[[:cntrl:]]', ' ', 'g')), '');
  clean_notes := nullif(trim(p_notes), '');
  clean_currency := coalesce(nullif(upper(trim(p_selected_currency)), ''), 'JOD');
  clean_explanation := nullif(trim(p_estimate_explanation), '');

  if clean_full_name is null then raise exception 'project_request_full_name_required' using errcode = '22023'; end if;
  if clean_phone is null then raise exception 'project_request_phone_required' using errcode = '22023'; end if;
  if clean_project_type is null then raise exception 'project_request_project_type_required' using errcode = '22023'; end if;
  if clean_project_idea is null then raise exception 'project_request_project_idea_required' using errcode = '22023'; end if;
  if clean_package_id is null then raise exception 'project_request_package_required' using errcode = '22023'; end if;
  if p_included_features is null or jsonb_typeof(p_included_features) <> 'array' then
    raise exception 'project_request_included_features_invalid' using errcode = '22023';
  end if;
  if p_selected_features is null or jsonb_typeof(p_selected_features) <> 'array' then
    raise exception 'project_request_selected_features_invalid' using errcode = '22023';
  end if;
  if coalesce(p_language_count, 1) < 1 then
    raise exception 'project_request_language_count_invalid' using errcode = '22023';
  end if;
  if p_estimated_max_jod is not null and p_estimated_min_jod is not null
    and p_estimated_max_jod < p_estimated_min_jod then
    raise exception 'project_request_estimate_range_invalid' using errcode = '22023';
  end if;

  select coalesce(jsonb_agg(feature_name order by first_position), '[]'::jsonb)
    into clean_included_features
  from (
    select feature_name, min(position) as first_position
    from (
      select nullif(trim(value), '') as feature_name, ordinality as position
      from jsonb_array_elements_text(p_included_features) with ordinality as features(value, ordinality)
    ) prepared
    where feature_name is not null
    group by feature_name
  ) deduplicated;

  select coalesce(jsonb_agg(feature_name order by first_position), '[]'::jsonb)
    into clean_selected_features
  from (
    select feature_name, min(position) as first_position
    from (
      select nullif(trim(value), '') as feature_name, ordinality as position
      from jsonb_array_elements_text(p_selected_features) with ordinality as features(value, ordinality)
    ) prepared
    where feature_name is not null
    group by feature_name
  ) deduplicated;

  if jsonb_array_length(clean_included_features) = 0 then
    raise exception 'project_request_included_features_required' using errcode = '22023';
  end if;

  for attempt in 1..5 loop
    generated_request_id := public.generate_project_request_id();
    begin
      insert into public.project_requests (
        request_id, full_name, phone, email, business_name, project_type, project_idea,
        package_id, included_features, selected_features, custom_features, language_count,
        timeline_option, requested_date, is_rush, contact_method, notes, additional_notes,
        estimated_min_jod, estimated_max_jod, selected_currency, converted_min, converted_max,
        estimate_explanation, maintenance_months, status, source_page, customer_name,
        customer_phone, customer_email, payload, submitted_at
      ) values (
        generated_request_id, clean_full_name, clean_phone, clean_email, clean_business_name,
        clean_project_type, clean_project_idea, clean_package_id, clean_included_features,
        clean_selected_features, clean_custom_features, coalesce(p_language_count, 1),
        clean_timeline_option, p_requested_date, coalesce(p_is_rush, false), clean_contact_method,
        clean_notes, clean_notes, p_estimated_min_jod, p_estimated_max_jod, clean_currency, p_converted_min,
        p_converted_max, clean_explanation, 8, 'new', 'start-project', clean_full_name,
        clean_phone, clean_email,
        jsonb_build_object(
          'request_id', generated_request_id,
          'project_type', clean_project_type,
          'project_idea', clean_project_idea,
          'package_id', clean_package_id,
          'included_features', clean_included_features,
          'selected_features', clean_selected_features,
          'custom_features', clean_custom_features,
          'language_count', coalesce(p_language_count, 1),
          'timeline_option', clean_timeline_option,
          'requested_date', p_requested_date,
          'is_rush', coalesce(p_is_rush, false),
          'contact_method', clean_contact_method,
          'notes', clean_notes,
          'additional_notes', clean_notes,
          'estimated_min_jod', p_estimated_min_jod,
          'estimated_max_jod', p_estimated_max_jod,
          'selected_currency', clean_currency,
          'converted_min', p_converted_min,
          'converted_max', p_converted_max,
          'estimate_explanation', clean_explanation,
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

revoke all on function public.submit_project_request(
  text, text, text, text, text, text, text, jsonb, jsonb, text, integer, text,
  date, boolean, text, text, numeric, numeric, text, numeric, numeric, text
) from public;
grant execute on function public.submit_project_request(
  text, text, text, text, text, text, text, jsonb, jsonb, text, integer, text,
  date, boolean, text, text, numeric, numeric, text, numeric, numeric, text
) to anon, authenticated;

notify pgrst, 'reload schema';
