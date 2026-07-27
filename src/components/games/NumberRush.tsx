import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  RotateCcw,
  Home as HomeIcon,
  Users,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap,
  Grid3x3,
} from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface NumberRushProps {
  settings: AppSettings;
  mode: 'solo' | 'friend' | GameMode;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

export const NumberRush: React.FC<NumberRushProps> = ({
  settings,
  mode,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['number-rush'] || getTranslations('en').games['number-rush'];

  // Game tracking state
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [p1Time, setP1Time] = useState<number | null>(null);
  const [p2Time, setP2Time] = useState<number | null>(null);

  const [bestTime, setBestTime] = useState<number | null>(() => {
    const saved = localStorage.getItem('sari_number_rush_best');
    return saved ? parseFloat(saved) : null;
  });

  const [showP2Transition, setShowP2Transition] = useState<boolean>(false);

  // Round grid state
  const [gridNumbers, setGridNumbers] = useState<number[]>([]);
  const [currentTarget, setCurrentTarget] = useState<number>(1);
  const [wrongShake, setWrongShake] = useState<number | null>(null);

  // Timer state
  const [elapsed, setElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Shuffle 1..25
  const generateGrid = useCallback(() => {
    const nums = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setGridNumbers(nums);
    setCurrentTarget(1);
    setElapsed(0);
    setIsRunning(false);
    startTimeRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    generateGrid();
  }, [generateGrid]);

  // Timer loop
  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const now = Date.now();
        setElapsed((now - startTimeRef.current) / 1000);
      }
    }, 30);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Rank helper
  const getRank = (seconds: number) => {
    if (seconds < 12) return gTrans.rankLegendary;
    if (seconds < 18) return gTrans.rankGold;
    if (seconds < 25) return gTrans.rankSilver;
    return gTrans.rankBronze;
  };

  // Game over completion
  const handleGameComplete = useCallback(
    (finalSeconds: number) => {
      setIsRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);

      soundManager.playSuccess();
      soundManager.vibrate(100);

      const rank = getRank(finalSeconds);

      if (mode === 'solo') {
        let isNewBest = false;
        if (!bestTime || finalSeconds < bestTime) {
          setBestTime(finalSeconds);
          localStorage.setItem('sari_number_rush_best', finalSeconds.toString());
          isNewBest = true;
        }

        const diffStr =
          bestTime !== null
            ? (finalSeconds - bestTime > 0 ? `+${(finalSeconds - bestTime).toFixed(2)}s` : `${(finalSeconds - bestTime).toFixed(2)}s`)
            : `${finalSeconds.toFixed(2)}s`;

        onFinish({
          gameId: 'number-rush',
          mode: 'solo',
          player1: {
            playerName: settings.player1Name,
            score: Math.round((1000 / finalSeconds) * 10), // converted score for leaderboards
            secondaryMetric: `${finalSeconds.toFixed(2)}s (${rank})`,
          },
          grade: rank,
        });
      } else {
        // Friend Mode
        if (activePlayer === 1) {
          setP1Time(finalSeconds);
          setShowP2Transition(true);
        } else {
          const p2Final = finalSeconds;
          const p1Final = p1Time ?? 999;

          const winner =
            p1Final < p2Final
              ? 'player1'
              : p2Final < p1Final
              ? 'player2'
              : 'draw';

          onFinish({
            gameId: 'number-rush',
            mode: 'friend',
            player1: {
              playerName: settings.player1Name,
              score: Math.round((1000 / p1Final) * 10),
              secondaryMetric: `${p1Final.toFixed(2)}s`,
            },
            player2: {
              playerName: settings.player2Name,
              score: Math.round((1000 / p2Final) * 10),
              secondaryMetric: `${p2Final.toFixed(2)}s`,
            },
            winner,
          });
        }
      }
    },
    [activePlayer, bestTime, mode, onFinish, p1Time, settings.player1Name, settings.player2Name]
  );

  // Handle number tile tap
  const handleNumberTap = (num: number) => {
    // If not started yet, pressing 1 starts timer
    if (!isRunning && currentTarget === 1) {
      if (num === 1) {
        setIsRunning(true);
        startTimeRef.current = Date.now();
        soundManager.playClick();
        soundManager.vibrate(20);
        setCurrentTarget(2);
      } else {
        // Clicked wrong starting number
        soundManager.playLose();
        soundManager.vibrate(80);
        setWrongShake(num);
        setTimeout(() => setWrongShake(null), 300);
      }
      return;
    }

    if (num === currentTarget) {
      soundManager.playClick();
      soundManager.vibrate(15);

      if (num === 25) {
        // Complete!
        const finalSecs = startTimeRef.current
          ? (Date.now() - startTimeRef.current) / 1000
          : elapsed;
        handleGameComplete(finalSecs);
      } else {
        setCurrentTarget((prev) => prev + 1);
      }
    } else {
      // Wrong number tapped!
      soundManager.playLose();
      soundManager.vibrate(80);
      setWrongShake(num);
      setTimeout(() => setWrongShake(null), 300);
    }
  };

  const handleStartP2Turn = () => {
    setShowP2Transition(false);
    setActivePlayer(2);
    generateGrid();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-teal-950 text-white p-4 md:p-6 select-none flex flex-col justify-between relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Header */}
      <div className="max-w-md mx-auto w-full z-10">
        <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white/90 hover:text-white cursor-pointer active:scale-95"
          >
            <HomeIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-blue-400 to-teal-400 text-slate-950 font-black text-xs md:text-sm shadow-md">
              {gTrans.title}
            </span>
            {mode === 'friend' && (
              <span className="px-2.5 py-1 rounded-xl bg-white/10 text-teal-300 font-extrabold text-xs flex items-center gap-1 border border-white/10">
                <Users className="w-3.5 h-3.5" />
                <span>
                  {activePlayer === 1 ? settings.player1Name : settings.player2Name}
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-teal-300 font-black text-base">
            <Clock className="w-4 h-4 text-teal-400" />
            <span>{elapsed.toFixed(2)}s</span>
          </div>
        </div>

        {/* Target & Best Time bar */}
        <div className="flex items-center justify-between px-3 py-2 mt-2 text-xs font-bold text-white/80">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <span>{gTrans.nextNumber}:</span>
            <span className="text-amber-300 font-black text-base animate-pulse">
              {currentTarget}
            </span>
          </div>

          {mode === 'solo' && bestTime !== null && (
            <div className="flex items-center gap-1 text-teal-300">
              <Award className="w-4 h-4" />
              <span>
                {t.bestTime}:{' '}
                <strong className="text-white">{bestTime.toFixed(2)}s</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 5x5 Grid Area */}
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col items-center justify-center my-2 z-10">
        <div className="w-full aspect-square grid grid-cols-5 gap-2 p-3 bg-white/5 backdrop-blur-md border-2 border-white/15 rounded-3xl shadow-2xl">
          {gridNumbers.map((num) => {
            const isCompleted = num < currentTarget;
            const isNext = num === currentTarget;
            const isShaking = wrongShake === num;

            return (
              <motion.button
                key={num}
                whileTap={{ scale: 0.9 }}
                animate={isShaking ? { x: [-8, 8, -6, 6, 0] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleNumberTap(num)}
                disabled={isCompleted}
                className={`relative flex items-center justify-center rounded-xl font-black text-lg md:text-xl shadow-md transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400/40 border border-emerald-500/20 cursor-default scale-95'
                    : isShaking
                    ? 'bg-rose-500 text-white border-2 border-rose-400'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {num}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="max-w-md mx-auto w-full text-center text-xs text-white/60 z-10 pb-2">
        {!isRunning && currentTarget === 1 ? (
          <span className="text-amber-300 font-bold animate-bounce block">
            👇 {gTrans.tapToStart || 'Tap number (1) to start!'}
          </span>
        ) : (
          <span>{gTrans.tapInOrder || 'Tap numbers in order from 1 to 25 as fast as possible!'}</span>
        )}
      </div>

      {/* Interstitial Modal for Player 2 (Friend Mode) */}
      <AnimatePresence>
        {showP2Transition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="max-w-sm w-full bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-teal-500/40 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center text-teal-300 text-2xl font-black">
                P1
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  {settings.player1Name} {t.finishedTurn}!
                </h3>
                <p className="text-sm text-white/70 mt-1">
                  الزمن: <strong className="text-teal-300">{p1Time?.toFixed(2)}s</strong>
                </p>
                <p className="text-xs text-white/50 mt-2">
                  {t.passDeviceTo} <strong>{settings.player2Name}</strong>
                </p>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  handleStartP2Turn();
                }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-500 text-slate-950 font-black text-base shadow-lg hover:brightness-110 cursor-pointer active:scale-95 transition-all"
              >
                {t.startPlayerTurn} {settings.player2Name}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
