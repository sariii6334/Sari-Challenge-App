import { AppSettings, Language } from '../types';

const SETTINGS_KEY = 'sari_challenge_settings_v1';

export const getDefaultSettings = (lang: Language = 'ar'): AppSettings => ({
  soundEnabled: true,
  vibrationEnabled: true,
  language: lang,
  player1Name: lang === 'ar' ? 'اللاعب الأول' : lang === 'tr' ? '1. Oyuncu' : 'Player 1',
  player2Name: lang === 'ar' ? 'اللاعب الثاني' : lang === 'tr' ? '2. Oyuncu' : 'Player 2',
  showPreGameExplanation: true,
  hasSelectedLanguage: false,
});

export const loadSettings = (): AppSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...getDefaultSettings(parsed.language || 'ar'),
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return getDefaultSettings('ar');
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
};
