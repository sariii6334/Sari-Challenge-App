import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ShieldCheck, WifiOff, Gamepad2 } from 'lucide-react';
import { getTranslations } from '../i18n/translations';
import { AppSettings } from '../types';
import { soundManager } from '../utils/sound';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, settings }) => {
  const t = getTranslations(settings.language);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 border border-white/20 rounded-3xl p-6 text-white shadow-2xl text-center overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo Badge */}
          <div className="mx-auto w-20 h-20 mb-4 rounded-3xl bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 p-0.5 shadow-xl flex items-center justify-center">
            <div className="w-full h-full bg-slate-900/80 rounded-[22px] flex items-center justify-center text-amber-300">
              <Gamepad2 className="w-10 h-10 animate-pulse" />
            </div>
          </div>

          <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-300 via-white to-pink-300 bg-clip-text text-transparent mb-1">
            {t.appName}
          </h2>

          <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-yellow-300 mb-4">
            {t.version}
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xl font-extrabold text-pink-300">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{t.createdBy}</span>
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              {t.appSubtitle}
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 text-xs font-semibold mb-6">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 justify-center">
              <WifiOff className="w-4 h-4" />
              <span>100% Offline</span>
            </div>
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center gap-2 justify-center">
              <ShieldCheck className="w-4 h-4" />
              <span>9 Mini Games</span>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 font-extrabold text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
          >
            {t.close}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
