import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { soundManager } from '../utils/sound';
import { Globe, Check } from 'lucide-react';

interface LanguageSelectionProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  currentLanguage,
  onSelectLanguage,
}) => {
  const languages: { id: Language; name: string; nativeName: string; flag: string; bg: string }[] = [
    {
      id: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      bg: 'from-amber-400 via-orange-500 to-rose-500',
    },
    {
      id: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧',
      bg: 'from-blue-500 via-indigo-600 to-purple-600',
    },
    {
      id: 'tr',
      name: 'Turkish',
      nativeName: 'Türkçe',
      flag: '🇹🇷',
      bg: 'from-rose-500 via-red-600 to-pink-600',
    },
    {
      id: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      bg: 'from-yellow-500 via-amber-600 to-red-600',
    },
    {
      id: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      bg: 'from-blue-600 via-sky-500 to-red-500',
    },
    {
      id: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      bg: 'from-indigo-500 via-purple-600 to-pink-500',
    },
    {
      id: 'nl',
      name: 'Dutch',
      nativeName: 'Nederlands',
      flag: '🇳🇱',
      bg: 'from-orange-500 via-amber-500 to-blue-600',
    },
    {
      id: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      bg: 'from-red-500 via-amber-500 to-yellow-400',
    },
    {
      id: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      bg: 'from-orange-500 via-amber-500 to-emerald-600',
    },
    {
      id: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      bg: 'from-red-600 via-rose-600 to-yellow-500',
    },
  ];

  const handleSelect = (lang: Language) => {
    soundManager.playSuccess();
    onSelectLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Background Orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 z-10 max-w-md"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 text-amber-300 font-semibold shadow-lg">
          <Globe className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Created by Sari</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-yellow-200 via-white to-pink-200 bg-clip-text text-transparent">
          اختر لغة التطبيق / Select Language
        </h1>
        <p className="text-white/80 text-sm md:text-base">
          Choose your preferred language to start the Sari Challenge platform
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl z-10">
        {languages.map((lang, index) => {
          const isSelected = currentLanguage === lang.id;
          return (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(lang.id)}
              className={`relative p-6 rounded-3xl bg-gradient-to-br ${lang.bg} border-2 ${
                isSelected ? 'border-yellow-300 ring-4 ring-yellow-300/40 shadow-2xl' : 'border-white/20 hover:border-white/60 shadow-xl'
              } flex flex-col items-center text-center cursor-pointer transition-all duration-300 group`}
            >
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {lang.flag}
              </span>
              <h2 className="text-2xl font-black text-white mb-1 drop-shadow">
                {lang.nativeName}
              </h2>
              <span className="text-sm font-medium text-white/80">
                {lang.name}
              </span>

              {isSelected && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 rounded-full p-1.5 shadow-md">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
