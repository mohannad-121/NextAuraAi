/**
 * Fast client-side guard for public review text. The database applies the same
 * policy before saving, so this is feedback for people—not the security boundary.
 */
const ENGLISH_PROFANITY = [
  /f+u+c+k+/,
  /b+i+t+c+h+/,
  /s+h+i+t+/,
  /a+s+s+h+o+l+e+/,
  /b+a+s+t+a+r+d+/,
  /d+a+m+n+/,
  /d+i+c+k+/,
  /p+u+s+s+y+/,
  /c+u+n+t+/,
  /w+h+o+r+e+/,
  /n+i+g+g+[ae]+r*/,
];

const ARABIC_PROFANITY = [
  /ك+س+/, /ك+س+م+/, /ش+ر+م+و+ط+/, /ز+ب+/, /ط+ي+ز+/, /ع+ر+ص+/, /م+ن+ي+ك+/, /م+ت+ن+ا+ك+/,
  /خ+ر+ا+/, /ق+ح+ب+/, /ا+ب+ن+ا+ل+ك+ل+ب+/, /ي+ل+ع+ن+/, /ح+ي+و+ا+ن+/,
];

function compactForModeration(value: string) {
  return value
    .normalize("NFKD")
    .toLocaleLowerCase()
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/[ىئ]/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ة/g, "ه")
    .replace(/گ/g, "ك")
    .replace(/چ/g, "ج")
    .replace(/پ/g, "ب")
    .replace(/ڤ/g, "ف")
    .replace(/@|4/g, "a")
    .replace(/3/g, "e")
    .replace(/0/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/[$5]/g, "s")
    .replace(/7/g, "t")
    .replace(/8/g, "u")
    .replace(/[69]/g, "g")
    .replace(/[^a-z\u0621-\u063a\u0641-\u064a]/g, "");
}

export function containsInappropriateLanguage(value: string) {
  const compact = compactForModeration(value);
  return [...ENGLISH_PROFANITY, ...ARABIC_PROFANITY].some((pattern) => pattern.test(compact));
}
