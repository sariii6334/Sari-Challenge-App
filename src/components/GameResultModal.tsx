import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Home, Award, Sparkles, AlertCircle } from 'lucide-react';
import { getTranslations } from '../i18n/translations';
import { AppSettings, GameResult } from '../types';
import { soundManager } from '../utils/sound';

interface GameResultModalProps {
  isOpen: boolean;
  result: GameResult | null;
  settings: AppSettings;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  result,
  settings,
  onPlayAgain,
  onMainMenu,
}) => {
  const t = getTranslations(settings.language);

  useEffect(() => {
    if (isOpen && result) {
      if (result.winner === 'player1' || result.winner === 'player2' || result.mode === 'solo') {
        soundManager.playWin();
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6'],
          });
        } catch (e) {
          // Fallback if confetti blocked
        }
      } else {
        soundManager.playLose();
      }
    }
  }, [isOpen, result]);

  if (!isOpen || !result) return null;

  const isSolo = result.mode === 'solo';

  // Determine Winner Title
  let winnerText = '';
  if (isSolo) {
    winnerText = result.grade || t.congratulations;
  } else if (result.winner === 'draw') {
    winnerText = t.draw;
  } else if (result.winner === 'player1') {
    winnerText = `${t.winner} ${result.player1?.playerName || t.player1Default}`;
  } else if (result.winner === 'player2') {
    winnerText = `${t.winner} ${result.player2?.playerName || t.player2Default}`;
  } else if (result.winner === 'ai') {
    winnerText = `${t.winner} ${t.computerName}`;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border border-white/20 rounded-3xl p-6 text-white shadow-2xl text-center overflow-hidden"
        >
          {/* Top Trophy Icon */}
          <div className="mx-auto w-24 h-24 mb-4 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 shadow-2xl flex items-center justify-center animate-bounce" style={{ animationDuration: '2s' }}>
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-300">
              {result.winner === 'draw' ? (
                <AlertCircle className="w-12 h-12 text-yellow-400" />
              ) : (
                <Trophy className="w-12 h-12 text-amber-300" />
              )}
            </div>
          </div>

          <h2 className="text-3xl font-black bg-gradient-to-r from-amber-300 via-yellow-100 to-pink-300 bg-clip-text text-transparent mb-1">
            {winnerText}
          </h2>

          <p className="text-xs text-white/70 mb-6 font-semibold">
            {isSolo ? (t.soloResultSubtitle || 'Solo Challenge Result') : (t.versusResultSubtitle || 'Head-to-Head Result')}
          </p>

          {/* Results Summary Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 space-y-3">
            {result.targetOrRef !== undefined && (
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 text-xs text-amber-300 font-bold">
                <span>{t.targetTime} / {t.games['perfect-line']?.targetLength || 'Target'}:</span>
                <span className="text-sm font-black">{result.targetOrRef}</span>
              </div>
            )}

            {isSolo ? (
              /* Solo Mode Score Grid */
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[11px] text-white/70 block mb-1">{t.score} / {t.accuracy}</span>
                  <span className="text-2xl font-black text-amber-300">{result.player1?.score ?? 0}</span>
                </div>
                {result.player1?.secondaryMetric !== undefined && (
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <span className="text-[11px] text-white/70 block mb-1">{t.difference} / {t.time}</span>
                    <span className="text-2xl font-black text-purple-300">
                      {result.player1?.secondaryMetric}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* Friend or AI Mode Score Comparison Table */
              <div className="space-y-2">
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  result.winner === 'player1' ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 text-white/80'
                }`}>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="font-extrabold text-sm">{result.player1?.playerName || t.player1Default}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-lg block">{result.player1?.score ?? 0}</span>
                    {result.player1?.secondaryMetric !== undefined && (
                      <span className="text-[10px] opacity-80 block">{result.player1.secondaryMetric}</span>
                    )}
                  </div>
                </div>

                {result.player2 && (
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    result.winner === 'player2' || result.winner === 'ai' ? 'bg-amber-500/20 border-amber-400 text-amber-200' : 'bg-white/5 border-white/10 text-white/80'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-400" />
                      <span className="font-extrabold text-sm">{result.player2?.playerName || t.player2Default}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-lg block">{result.player2?.score ?? 0}</span>
                      {result.player2?.secondaryMetric !== undefined && (
                        <span className="text-[10px] opacity-80 block">{result.player2.secondaryMetric}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onMainMenu();
              }}
              className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>{t.mainMenu}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onPlayAgain();
              }}
              className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 font-extrabold text-sm text-slate-950 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.playAgain}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
