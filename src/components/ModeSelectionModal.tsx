import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Users, Bot, X } from 'lucide-react';
import { getTranslations } from '../i18n/translations';
import { AppSettings, GameId, GameMode } from '../types';
import { GAMES_LIST } from '../data/games';
import { soundManager } from '../utils/sound';
import { getGameThumbnail } from '../utils/gameThumbnails';
import { AdBanner } from './AdBanner';

interface ModeSelectionModalProps {
  isOpen: boolean;
  gameId: GameId | null;
  settings: AppSettings;
  onSelectMode: (mode: GameMode) => void;
  onClose: () => void;
}

export const ModeSelectionModal: React.FC<ModeSelectionModalProps> = ({
  isOpen,
  gameId,
  settings,
  onSelectMode,
  onClose,
}) => {
  const t = getTranslations(settings.language);

  if (!isOpen || !gameId) return null;

  const gameInfo = GAMES_LIST.find((g) => g.id === gameId);
  const isAIModeAvailable = gameInfo?.supportsAI;
  const thumbnailSrc = getGameThumbnail(gameId);

  const handleChoose = (mode: GameMode) => {
    soundManager.playSuccess();
    onSelectMode(mode);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border border-white/20 rounded-3xl p-6 text-white shadow-2xl text-center overflow-hidden"
        >
          {/* Close */}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Game Thumbnail Banner */}
          {thumbnailSrc && (
            <div className="relative w-full h-28 mb-3 rounded-2xl overflow-hidden border border-white/20">
              <img
                src={thumbnailSrc}
                alt={gameInfo?.badge}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
          )}

          <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black mb-2">
            {gameInfo?.badge}
          </span>

          <h2 className="text-2xl font-black bg-gradient-to-r from-amber-300 via-white to-pink-300 bg-clip-text text-transparent mb-2">
            {t.selectMode}
          </h2>

          <p className="text-xs text-white/70 mb-6 font-medium">
            {t.selectModeSubtitle || 'Choose a mode to start'}
          </p>

          <div className="space-y-4">
            {/* If game supports AI, offer vs AI or Friend. Otherwise, check supportsFriend */}
            {isAIModeAvailable ? (
              <>
                <button
                  onClick={() => handleChoose('ai')}
                  className="w-full p-5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 border border-white/20 hover:border-yellow-300 font-black text-lg flex items-center justify-between shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/10 text-yellow-300 group-hover:scale-110 transition-transform">
                      <Bot className="w-7 h-7" />
                    </div>
                    <div className="text-left rtl:text-right">
                      <span className="block text-base">{t.playVsAI}</span>
                      <span className="text-xs font-normal text-white/70">
                        {t.aiModeDesc || 'Challenge AI'}
                      </span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleChoose('friend')}
                  className="w-full p-5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 border border-white/20 hover:border-yellow-300 font-black text-lg flex items-center justify-between shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/10 text-yellow-300 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7" />
                    </div>
                    <div className="text-left rtl:text-right">
                      <span className="block text-base">{t.playWithFriend}</span>
                      <span className="text-xs font-normal text-white/70">
                        {t.friendModeDesc || 'Compete with a friend on the same device'}
                      </span>
                    </div>
                  </div>
                </button>
              </>
            ) : gameInfo?.supportsFriend === false ? (
              <button
                onClick={() => handleChoose('solo')}
                className="w-full p-5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 border border-white/20 hover:border-yellow-200 font-black text-lg flex items-center justify-between shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group text-slate-950"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-black/10 text-slate-950 group-hover:scale-110 transition-transform">
                    <User className="w-7 h-7" />
                  </div>
                  <div className="text-left rtl:text-right">
                    <span className="block text-base font-black">{t.playSolo}</span>
                    <span className="text-xs font-bold text-slate-900/80">
                      {t.soloModeDesc || 'Defend the hive in endless solo survival'}
                    </span>
                  </div>
                </div>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleChoose('solo')}
                  className="w-full p-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 border border-white/20 hover:border-yellow-300 font-black text-lg flex items-center justify-between shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/10 text-yellow-300 group-hover:scale-110 transition-transform">
                      <User className="w-7 h-7" />
                    </div>
                    <div className="text-left rtl:text-right">
                      <span className="block text-base">{t.playSolo}</span>
                      <span className="text-xs font-normal text-white/70">
                        {t.soloModeDesc || 'Break your personal record with top accuracy'}
                      </span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleChoose('friend')}
                  className="w-full p-5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 border border-white/20 hover:border-yellow-300 font-black text-lg flex items-center justify-between shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/10 text-yellow-300 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7" />
                    </div>
                    <div className="text-left rtl:text-right">
                      <span className="block text-base">{t.playWithFriend}</span>
                      <span className="text-xs font-normal text-white/70">
                        {t.friendTurnDesc || 'Turn-by-turn duel against your friend'}
                      </span>
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>

          <div className="mt-4 pt-2">
            <AdBanner language={settings.language} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
