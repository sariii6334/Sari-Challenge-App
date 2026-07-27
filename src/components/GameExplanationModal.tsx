import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Check, X, Sparkles } from 'lucide-react';
import { getTranslations } from '../i18n/translations';
import { AppSettings, GameId } from '../types';
import { GAMES_LIST } from '../data/games';
import { soundManager } from '../utils/sound';
import { getGameThumbnail } from '../utils/gameThumbnails';

interface GameExplanationModalProps {
  isOpen: boolean;
  gameId: GameId | null;
  settings: AppSettings;
  onStart: () => void;
  onCancel: () => void;
  onToggleDontShow: (dontShow: boolean) => void;
}

export const GameExplanationModal: React.FC<GameExplanationModalProps> = ({
  isOpen,
  gameId,
  settings,
  onStart,
  onCancel,
  onToggleDontShow,
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const t = getTranslations(settings.language);

  if (!isOpen || !gameId) return null;

  const gameInfo = GAMES_LIST.find((g) => g.id === gameId);
  const thumbnailSrc = getGameThumbnail(gameId);
  const gameTrans = t.games[gameId as keyof typeof t.games] || {
    title: gameId,
    desc: '',
    guide: [],
  };

  const handleStartGame = () => {
    soundManager.playSuccess();
    if (dontShowAgain) {
      onToggleDontShow(true);
    }
    onStart();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border border-white/20 rounded-3xl p-6 text-white shadow-2xl overflow-hidden"
        >
          {/* Top Close */}
          <button
            onClick={() => {
              soundManager.playClick();
              onCancel();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Thumbnail Banner */}
          {thumbnailSrc && (
            <div className="relative w-full h-32 mb-4 rounded-2xl overflow-hidden border border-white/20">
              <img
                src={thumbnailSrc}
                alt={gameTrans.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          )}

          {/* Badge & Title */}
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black mb-2">
              {gameInfo?.badge}
            </span>
            <h2 className="text-3xl font-black bg-gradient-to-r from-amber-300 via-white to-pink-300 bg-clip-text text-transparent">
              {gameTrans.title}
            </h2>
            <p className="text-xs text-white/70 mt-1 font-medium">
              {gameTrans.desc}
            </p>
          </div>

          {/* Bullet Rules */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.howToPlay || t.gameGuide}:</span>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-white/90">
              {gameTrans.guide.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don't show again Checkbox */}
          <button
            onClick={() => {
              soundManager.playClick();
              setDontShowAgain(!dontShowAgain);
            }}
            className="flex items-center gap-2 mb-6 text-xs text-white/80 hover:text-white transition-all cursor-pointer group select-none"
          >
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                dontShowAgain
                  ? 'bg-amber-400 border-amber-300 text-slate-950'
                  : 'bg-white/10 border-white/30 group-hover:border-white/60'
              }`}
            >
              {dontShowAgain && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
            <span className="font-medium">{t.dontShowAgain}</span>
          </button>

          {/* Big Start Button */}
          <button
            onClick={handleStartGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 font-black text-slate-950 text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <span>{t.startGame}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
