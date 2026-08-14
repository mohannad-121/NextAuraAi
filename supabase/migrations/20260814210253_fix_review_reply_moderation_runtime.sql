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
notify pgrst, 'reload schema';
