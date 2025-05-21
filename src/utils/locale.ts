import { Locale } from '~/paraglide/runtime';

export function getDirectionFromLocale(locale: Locale): 'rtl' | 'ltr' {
  if (['ar'].includes(locale)) {
    return 'rtl';
  }
  return 'ltr';
}
