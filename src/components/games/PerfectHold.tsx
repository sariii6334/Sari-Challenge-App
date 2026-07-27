import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Square, Eye, EyeOff, Timer } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface PerfectHoldProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

export const PerfectHold: React.FC<PerfectHoldProps> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['perfect-hold'] || getTranslations('en').games['perfect-hold'];

  const [phase, setPhase] = useState<'preview' | 'playing' | 'turn_complete'>('preview');
  const [targetTime, setTargetTime] = useState<number>(5.0);
  const [activePlayer, setActivePlayer] = useState<number>(1); // 1 or 2
  const [p1Actual, setP1Actual] = useState<number | null>(null);
  const [p2Actual, setP2Actual] = useState<number | null>(null);

  const startTimeRef = useRef<number>(0);

  // Initialize random target time on mount
  useEffect(() => {
    // Generate random target time between 2.00s and 30.00s for max fun
    const randomTarget = parseFloat((Math.random() * 28 + 2).toFixed(2));
    setTargetTime(randomTarget);
  }, []);

  const handleStartTimer = () => {
    soundManager.playSuccess();
    setPhase('playing');
    startTimeRef.current = performance.now();
  };

  const handleStopTimer = () => {
    soundManager.playClick();
    const elapsedMs = performance.now() - startTimeRef.current;
    const elapsedSec = parseFloat((elapsedMs / 1000).toFixed(2));

    if (mode === 'friend' && activePlayer === 1) {
      setP1Actual(elapsedSec);
      setPhase('preview');
      setActivePlayer(2);
    } else if (mode === 'friend' && activePlayer === 2) {
      const p1Val = p1Actual || 0;
      const p2Val = elapsedSec;
      setP2Actual(p2Val);

      const diff1 = Math.abs(p1Val - targetTime);
      const diff2 = Math.abs(p2Val - targetTime);

      let winner: 'player1' | 'player2' | 'draw' = 'draw';
      if (diff1 < diff2) winner = 'player1';
      else if (diff2 < diff1) winner = 'player2';

      onFinish({
        gameId: 'perfect-hold',
        mode: 'friend',
        targetOrRef: `${targetTime}s`,
        player1: {
          playerName: settings.player1Name,
          score: `${p1Val}s`,
          secondaryMetric: `الفرق: ${diff1.toFixed(2)}s`,
        },
        player2: {
          playerName: settings.player2Name,
          score: `${p2Val}s`,
          secondaryMetric: `الفرق: ${diff2.toFixed(2)}s`,
        },
        winner,
      });
    } else {
      // Solo Mode
      const diff = Math.abs(elapsedSec - targetTime);
      const accuracyPct = Math.max(0, Math.min(100, Math.round(100 - (diff / targetTime) * 100)));

      let grade = t.tryAgain;
      if (diff <= 0.25) grade = t.excellent;
      else if (diff <= 0.6) grade = t.veryGood;
      else if (diff <= 1.2) grade = t.good;

      onFinish({
        gameId: 'perfect-hold',
        mode: 'solo',
        targetOrRef: `${targetTime}s`,
        player1: {
          playerName: settings.player1Name,
          score: `${accuracyPct}% (${elapsedSec}s)`,
          secondaryMetric: `${diff.toFixed(2)}s فرق`,
        },
        winner: 'player1',
        grade,
      });
    }
  };

  const currentPlayerName =
    activePlayer === 1 ? settings.player1Name : settings.player2Name;

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh] p-4 text-white text-center select-none">
      {/* Header Info */}
      <div className="w-full max-w-md flex items-center justify-between bg-white/10 p-4 rounded-2xl border border-white/20">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-amber-400 animate-pulse" />
          <h2 className="text-xl font-black">{gTrans.title}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
          {currentPlayerName}
        </span>
      </div>

      {/* Main Game Stage */}
      <div className="my-auto w-full max-w-md flex flex-col items-center">
        {phase === 'preview' ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-amber-500/10 border-2 border-amber-400/50 shadow-2xl flex flex-col items-center"
          >
            <Eye className="w-12 h-12 text-amber-300 mb-3 animate-bounce" />
            <span className="text-sm font-bold text-amber-200 mb-2">
              {gTrans.targetMsg}
            </span>
            <div className="text-6xl font-black text-amber-300 tracking-wider mb-4 font-mono">
              {targetTime.toFixed(2)}s
            </div>
            <p className="text-xs text-white/80 mb-6 max-w-xs">
              {gTrans.memorizeMsg}
            </p>

            <button
              onClick={handleStartTimer}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 font-black text-slate-950 text-lg shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-6 h-6 fill-slate-950" />
              <span>{gTrans.pressToStart}</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full p-8 rounded-3xl bg-slate-900/80 border-2 border-white/20 shadow-2xl flex flex-col items-center relative overflow-hidden"
          >
            {/* Animated Pulsing Ring representing silent timer */}
            <div className="relative my-8 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-40 h-40 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-xl absolute"
              />
              <div className="w-36 h-36 rounded-full bg-slate-950 border-4 border-amber-400/80 flex items-center justify-center z-10 shadow-inner">
                <EyeOff className="w-16 h-16 text-amber-400 animate-pulse" />
              </div>
            </div>

            <p className="text-sm font-bold text-amber-300 mb-8 max-w-xs leading-relaxed">
              {gTrans.stopWhenReady}
            </p>

            {/* Big Stop Button */}
            <button
              onClick={handleStopTimer}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-500 via-rose-600 to-red-500 font-black text-white text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 border border-red-400"
            >
              <Square className="w-7 h-7 fill-white" />
              <span>{gTrans.stop}</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer Back */}
      <div className="w-full max-w-md pt-4">
        <button
          onClick={onBack}
          className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all cursor-pointer"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
};
