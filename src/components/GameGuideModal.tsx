import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, ChevronRight } from 'lucide-react';
import { getTranslations } from '../i18n/translations';
import { GAMES_LIST } from '../data/games';
import { AppSettings, GameId } from '../types';
import { soundManager } from '../utils/sound';

interface GameGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSelectGame?: (gameId: GameId) => void;
}

export const GameGuideModal: React.FC<GameGuideModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSelectGame,
}) => {
  const t = getTranslations(settings.language);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border border-white/20 rounded-3xl p-6 text-white shadow-2xl my-8 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  {t.gameGuide}
                </h2>
                <span className="text-xs text-white/60">
                  Sari Challenge - 12 Competitive Games
                </span>
              </div>
            </div>
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

          {/* Games Guide List */}
          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
            {GAMES_LIST.map((game, index) => {
              const gameTrans = t.games[game.id as keyof typeof t.games] || {
                title: game.id,
                desc: '',
                guide: [],
              };
              return (
                <div
                  key={game.id}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${game.bgGradient} border border-white/15 hover:border-white/30 transition-all`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-black text-amber-300">
                        {game.badge}
                      </span>
                      <h3 className="text-lg font-black text-white">
                        {gameTrans.title}
                      </h3>
                    </div>
                    {onSelectGame && (
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onClose();
                          onSelectGame(game.id);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-yellow-300 flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span>{t.startGame}</span>
                        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                      </button>
                    )}
                  </div>

                  <p className="text-xs font-medium text-white/80 mb-3 italic">
                    {gameTrans.desc}
                  </p>

                  <ul className="space-y-1.5 text-xs text-white/90 list-disc list-inside bg-black/20 p-3 rounded-xl border border-white/5">
                    {gameTrans.guide.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 font-extrabold text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
            >
              {t.close}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
