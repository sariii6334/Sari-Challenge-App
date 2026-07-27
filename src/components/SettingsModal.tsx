import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, VolumeX, Smartphone, Globe, User, RotateCcw, BookOpen, Check } from 'lucide-react';
import { getTranslations } from '../i18n/translations';
import { AppSettings, Language } from '../types';
import { soundManager } from '../utils/sound';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (newSettings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const t = getTranslations(settings.language);

  if (!isOpen) return null;

  const handleLanguageChange = (lang: Language) => {
    soundManager.playClick();
    onSaveSettings({
      ...settings,
      language: lang,
    });
  };

  const handleToggleSound = () => {
    const next = !settings.soundEnabled;
    soundManager.updateSettings(next, settings.vibrationEnabled);
    if (next) soundManager.playClick();
    onSaveSettings({ ...settings, soundEnabled: next });
  };

  const handleToggleVibration = () => {
    const next = !settings.vibrationEnabled;
    soundManager.updateSettings(settings.soundEnabled, next);
    if (next) soundManager.vibrate(50);
    onSaveSettings({ ...settings, vibrationEnabled: next });
  };

  const handleTogglePreGameInfo = () => {
    soundManager.playClick();
    onSaveSettings({ ...settings, showPreGameExplanation: !settings.showPreGameExplanation });
  };

  const handleResetNames = () => {
    soundManager.playClick();
    onSaveSettings({
      ...settings,
      player1Name: t.player1Default,
      player2Name: t.player2Default,
    });
  };

  const handleResetAll = () => {
    soundManager.playClick();
    const lang = settings.language;
    onSaveSettings({
      soundEnabled: true,
      vibrationEnabled: true,
      language: lang,
      player1Name: getTranslations(lang).player1Default,
      player2Name: getTranslations(lang).player2Default,
      showPreGameExplanation: true,
      hasSelectedLanguage: true,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border border-white/20 rounded-3xl p-6 text-white shadow-2xl my-8 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <h2 className="text-2xl font-black bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              {t.settings}
            </h2>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
            {/* Audio & Vibration Controls */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleToggleSound}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  settings.soundEnabled
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-white/5 border-white/10 text-white/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  <span className="text-sm font-bold">{t.soundEffects}</span>
                </div>
                <div className={`w-4 h-4 rounded-full border ${settings.soundEnabled ? 'bg-amber-400 border-amber-300' : 'bg-transparent border-white/30'}`} />
              </button>

              <button
                onClick={handleToggleVibration}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  settings.vibrationEnabled
                    ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                    : 'bg-white/5 border-white/10 text-white/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  <span className="text-sm font-bold">{t.vibration}</span>
                </div>
                <div className={`w-4 h-4 rounded-full border ${settings.vibrationEnabled ? 'bg-purple-400 border-purple-300' : 'bg-transparent border-white/30'}`} />
              </button>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                {t.appLanguage}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'ar', label: 'العربية', flag: '🇸🇦' },
                  { id: 'en', label: 'English', flag: '🇬🇧' },
                  { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
                  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
                  { id: 'fr', label: 'Français', flag: '🇫🇷' },
                  { id: 'ko', label: '한국어', flag: '🇰🇷' },
                  { id: 'nl', label: 'Nederlands', flag: '🇳🇱' },
                  { id: 'es', label: 'Español', flag: '🇪🇸' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleLanguageChange(l.id as Language)}
                    className={`py-3 px-2 rounded-2xl border font-bold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      settings.language === l.id
                        ? 'bg-gradient-to-r from-amber-500 to-pink-500 border-yellow-300 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Player Names */}
            <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-400" />
                  أسماء اللاعبين / Player Names
                </label>
                <button
                  onClick={handleResetNames}
                  className="text-xs font-semibold text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t.resetNames}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-white/60 mb-1 block">{t.player1NameLabel}</span>
                  <input
                    type="text"
                    value={settings.player1Name}
                    onChange={(e) =>
                      onSaveSettings({ ...settings, player1Name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/20 text-white text-sm font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <span className="text-xs text-white/60 mb-1 block">{t.player2NameLabel}</span>
                  <input
                    type="text"
                    value={settings.player2Name}
                    onChange={(e) =>
                      onSaveSettings({ ...settings, player2Name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/20 text-white text-sm font-bold focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Show Pre-game explanation toggle */}
            <button
              onClick={handleTogglePreGameInfo}
              className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                settings.showPreGameExplanation
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                  : 'bg-white/5 border-white/10 text-white/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-left">{t.showPreGameInfo}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                  settings.showPreGameExplanation
                    ? 'bg-emerald-400 border-emerald-300 text-slate-950'
                    : 'bg-transparent border-white/30'
                }`}
              >
                {settings.showPreGameExplanation && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </button>

            {/* Reset All */}
            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={handleResetAll}
                className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-bold transition-all cursor-pointer"
              >
                {t.resetSettings}
              </button>

              <button
                onClick={() => {
                  soundManager.playSuccess();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 font-black text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {t.save}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
