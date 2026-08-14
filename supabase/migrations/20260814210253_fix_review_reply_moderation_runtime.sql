-- Supabase installs extensions outside the function's safe search path.
-- Keep the moderation function self-contained so anonymous reply RPCs can run.

create or replace function public.review_text_is_inappropriate(p_text text)
returns boolean
language plpgsql
stable
set search_path = public, pg_temp
as $function$
declare
  normalized text;
begin
  normalized := lower(coalesce(p_text, ''));
  normalized := replace(normalized, 'ـ', '');
  normalized := translate(normalized, 'أإآٱىئؤةگچپڤکی', 'ااااييوهكجبفكي');
  normalized := translate(normalized, '@4301!$57869', 'aaeoiisstugg');
  normalized := regexp_replace(normalized, '[^a-zء-ي]+', '', 'g');

  return normalized ~
    '(f+u+c+k+|b+i+t+c+h+|s+h+i+t+|a+s+s+h+o+l+e+|b+a+s+t+a+r+d+|d+a+m+n+|d+i+c+k+|p+u+s+s+y+|c+u+n+t+|w+h+o+r+e+|n+i+g+g+[ae]+r*|ك+س+|ك+س+م+|ش+ر+م+و+ط+|ز+ب+|ط+ي+ز+|ع+ر+ص+|م+ن+ي+ك+|م+ت+ن+ا+ك+|خ+ر+ا+|ق+ح+ب+|ا+ب+ن+ا+ل+ك+ل+ب+|ي+ل+ع+ن+|ح+ي+و+ا+ن+)';
end
$function$;

revoke all on function public.review_text_is_inappropriate(text) from public;

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
  clean_display_name := nullif(
    left(trim(regexp_replace(coalesce(p_display_name, ''), '[[:cntrl:]]', ' ', 'g')), 80),
    ''
  );
  clean_comment := left(
    trim(regexp_replace(coalesce(p_comment, ''), '[[:cntrl:]]', ' ', 'g')),
    500
  );

  if p_review_id is null or not exists (
    select 1
    from public.customer_reviews
    where customer_reviews.id = p_review_id
      and customer_reviews.is_visible = true
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
  if p_visitor_id is null
    or p_visitor_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
    raise exception 'review_visitor_invalid' using errcode = '22023';
  end if;

  select count(*) into recent_reply_count
  from public.customer_review_replies
  where customer_review_replies.visitor_id = lower(p_visitor_id)
    and customer_review_replies.created_at >= timezone('utc', now()) - interval '1 hour';
  if recent_reply_count >= 12 then
    raise exception 'review_reply_rate_limited' using errcode = 'P0001';
  end if;

  if exists (
    select 1
    from public.customer_review_replies
    where customer_review_replies.review_id = p_review_id
      and customer_review_replies.visitor_id = lower(p_visitor_id)
      and lower(customer_review_replies.comment) = lower(clean_comment)
      and customer_review_replies.created_at >= timezone('utc', now()) - interval '10 minutes'
  ) then
    raise exception 'review_reply_duplicate' using errcode = 'P0001';
  end if;

  return query
  insert into public.customer_review_replies (
    review_id, display_name, comment, visitor_id, is_visible
  )
  values (p_review_id, clean_display_name, clean_comment, lower(p_visitor_id), true)
  returning
    customer_review_replies.id,
    customer_review_replies.review_id,
    customer_review_replies.display_name,
    customer_review_replies.comment,
    customer_review_replies.created_at;
end
$function$;

revoke all on function public.submit_customer_review_reply(uuid, text, text, text) from public;
grant execute on function public.submit_customer_review_reply(uuid, text, text, text)
  to anon, authenticated;
notify pgrst, 'reload schema';
