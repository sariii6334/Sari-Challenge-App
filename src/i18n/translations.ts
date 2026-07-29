import { Language, Translations } from '../types';
import { ar } from './locales/ar';
import { en } from './locales/en';
import { tr } from './locales/tr';
import { de } from './locales/de';
import { fr } from './locales/fr';
import { ko } from './locales/ko';
import { nl } from './locales/nl';
import { es } from './locales/es';
import { hi } from './locales/hi';
import { zh } from './locales/zh';

export type { Translations };

export const translations: Record<Language, Translations> = {
  ar,
  en,
  tr,
  de,
  fr,
  ko,
  nl,
  es,
  hi,
  zh,
};

export function getTranslations(lang?: Language): Translations {
  if (lang && translations[lang]) {
    return translations[lang];
  }
  return translations.ar || translations.en;
}
