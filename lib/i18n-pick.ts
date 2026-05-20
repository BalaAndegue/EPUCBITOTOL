/**
 * Pick the localized value for a bilingual DB record.
 * Falls back to the French (default) value if the English field is empty.
 */
export function pick(fr: string | null | undefined, en: string | null | undefined, locale: string): string {
  if (locale === 'en' && en && en.trim()) return en;
  return fr ?? '';
}
