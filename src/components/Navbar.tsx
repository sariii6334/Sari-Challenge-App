import React from 'react';
import { Volume2, VolumeX, Settings, Sparkles, HelpCircle, Info } from 'lucide-react';
import { getTranslations } from '../i18n/translations';
import { AppSettings, Language } from '../types';
import { soundManager } from '../utils/sound';

interface NavbarProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onUpdateSettings,
  onOpenSettings,
  onOpenAbout,
  onOpenGuide,
}) => {
  const t = getTranslations(settings.language);

  const toggleSound = () => {
    const nextSound = !settings.soundEnabled;
    onUpdateSettings({ soundEnabled: nextSound });
    soundManager.updateSettings(nextSound, settings.vibrationEnabled);
    if (nextSound) soundManager.playClick();
  };

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 backdrop-blur-md border-b border-white/10 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center text-white shadow-md ring-2 ring-white/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-200 to-white bg-clip-text text-transparent">
              {t.appName}
            </h1>
            <span className="text-xs text-yellow-300/90 font-medium block">
              Created by Sari
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenGuide();
            }}
            title={t.gameGuide}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-yellow-300 hover:scale-105 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="hidden sm:inline">{t.gameGuide}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenAbout();
            }}
            title={t.about}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-pink-300 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            <Info className="w-5 h-5" />
          </button>

          <button
            onClick={toggleSound}
            title={t.soundEffects}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5 text-red-300" />
            )}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenSettings();
            }}
            title={t.settings}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 border border-white/30 text-white shadow-md hover:scale-105 transition-all active:scale-95 cursor-pointer"
          >
            <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }} />
          </button>
        </div>
      </div>
    </header>
  );
};
