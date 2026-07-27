import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Move, Sparkles, Tv, AlertTriangle, RotateCcw } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';
import { AdModal } from '../AdModal';
import { AdBanner } from '../AdBanner';

interface CopyMoveProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const DIRECTION_ARROWS: Record<Direction, { icon: string; freq: number }> = {
  UP: { icon: '⬆️', freq: 880 },
  DOWN: { icon: '⬇️', freq: 440 },
  LEFT: { icon: '⬅️', freq: 587.33 },
  RIGHT: { icon: '➡️', freq: 659.25 },
};

export const CopyMove: React.FC<CopyMoveProps> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['copy-move'] || getTranslations('en').games['copy-move'];
  const isAr = settings.language === 'ar';

  const [level, setLevel] = useState<number>(1);
  const [sequence, setSequence] = useState<Direction[]>([]);
  const [playerDrawn, setPlayerDrawn] = useState<Direction[]>([]);
  const [displayedArrow, setDisplayedArrow] = useState<Direction | null>(null);
  const [phase, setPhase] = useState<'watch' | 'draw'>('watch');
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [p1MaxLevel, setP1MaxLevel] = useState<number | null>(null);

  // Ad Revive States
  const [showAdOffer, setShowAdOffer] = useState<boolean>(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState<boolean>(false);
  const [hasUsedAdRevive, setHasUsedAdRevive] = useState<boolean>(false);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => {
    startNewLevel(1);
    return () => {
      clearAllTimeouts();
    };
  }, []);

  const startNewLevel = (lvl: number) => {
    clearAllTimeouts();
    const seqLen = lvl + 1; // Level 1 = 2 arrows
    const dirs: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    const newSeq: Direction[] = [];
    for (let i = 0; i < seqLen; i++) {
      newSeq.push(dirs[Math.floor(Math.random() * dirs.length)]);
    }

    setSequence(newSeq);
    setPlayerDrawn([]);
    setLevel(lvl);
    setPhase('watch');

    // Play arrow sequence one by one
    playArrowSequence(newSeq);
  };

  const playArrowSequence = (seq: Direction[]) => {
    seq.forEach((dir, idx) => {
      const t1 = setTimeout(() => {
        setDisplayedArrow(dir);
        soundManager.playTone(DIRECTION_ARROWS[dir].freq, 0.35);
        const t2 = setTimeout(() => {
          setDisplayedArrow(null);
        }, 450);
        timeoutsRef.current.push(t2);
      }, (idx + 1) * 700);
      timeoutsRef.current.push(t1);
    });

    const tEnd = setTimeout(() => {
      setPhase('draw');
    }, (seq.length + 1) * 700);
    timeoutsRef.current.push(tEnd);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'draw') return;
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== 'draw' || !touchStartRef.current) return;

    const dx = e.clientX - touchStartRef.current.x;
    const dy = e.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const minDistance = 25; // minimum swipe distance
    if (Math.abs(dx) < minDistance && Math.abs(dy) < minDistance) return;

    let detectedDir: Direction = 'UP';
    if (Math.abs(dx) > Math.abs(dy)) {
      detectedDir = dx > 0 ? 'RIGHT' : 'LEFT';
    } else {
      detectedDir = dy > 0 ? 'DOWN' : 'UP';
    }

    // Play swipe sound
    soundManager.playTone(DIRECTION_ARROWS[detectedDir].freq, 0.2);
    soundManager.vibrate(30);

    const nextDrawn = [...playerDrawn, detectedDir];
    setPlayerDrawn(nextDrawn);

    const currentStep = nextDrawn.length - 1;

    // Check Match
    if (nextDrawn[currentStep] !== sequence[currentStep]) {
      // Wrong Gesture!
      soundManager.playError();
      if (!hasUsedAdRevive) {
        setShowAdOffer(true);
      } else {
        handleGameOver(level - 1);
      }
      return;
    }

    // Check Level Complete
    if (nextDrawn.length === sequence.length) {
      soundManager.playSuccess();
      setHasUsedAdRevive(false);
      setTimeout(() => {
        startNewLevel(level + 1);
      }, 800);
    }
  };

  const handleRewardGranted = () => {
    setHasUsedAdRevive(true);
    setShowAdOffer(false);
    setPlayerDrawn([]);

    // Replay arrow sequence
    setTimeout(() => {
      setPhase('watch');
      playArrowSequence(sequence);
    }, 400);
  };

  const handleGameOver = (finalLevel: number) => {
    setShowAdOffer(false);
    if (mode === 'friend' && activePlayer === 1) {
      setP1MaxLevel(finalLevel);
      setActivePlayer(2);
      startNewLevel(1);
    } else if (mode === 'friend' && activePlayer === 2) {
      const l1 = p1MaxLevel || 0;
      const l2 = finalLevel;

      let winner: 'player1' | 'player2' | 'draw' = 'draw';
      if (l1 > l2) winner = 'player1';
      else if (l2 > l1) winner = 'player2';

      onFinish({
        gameId: 'copy-move',
        mode: 'friend',
        player1: {
          playerName: settings.player1Name,
          score: `المستوى ${l1}`,
        },
        player2: {
          playerName: settings.player2Name,
          score: `المستوى ${l2}`,
        },
        winner,
      });
    } else {
      // Solo Mode
      let grade = t.tryAgain;
      if (finalLevel >= 7) grade = t.excellent;
      else if (finalLevel >= 4) grade = t.veryGood;
      else if (finalLevel >= 2) grade = t.good;

      onFinish({
        gameId: 'copy-move',
        mode: 'solo',
        player1: {
          playerName: settings.player1Name,
          score: `المستوى ${finalLevel}`,
          secondaryMetric: 'أعلى مرحلة تم رسم حركاتها بنجاح',
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
      <div className="w-full max-w-md bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Move className="w-6 h-6 text-violet-400" />
          <h2 className="text-xl font-black">{gTrans.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-violet-400 text-slate-950 text-xs font-black">
            المستوى {level}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold">
            {currentPlayerName}
          </span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="my-auto w-full max-w-md flex flex-col items-center">
        <div className="mb-4">
          <span className="text-sm font-bold text-violet-300 flex items-center gap-1.5 justify-center">
            <Sparkles className="w-4 h-4" />
            {phase === 'watch' ? gTrans.watchArrows : gTrans.drawOnPad}
          </span>
        </div>

        {/* Display Stage or Drawing Notepad */}
        {phase === 'watch' ? (
          <div className="w-full h-72 rounded-3xl bg-slate-900/90 border-2 border-violet-400/50 shadow-2xl flex items-center justify-center">
            {displayedArrow ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                className="text-8xl filter drop-shadow-[0_0_20px_#a855f7]"
              >
                {DIRECTION_ARROWS[displayedArrow].icon}
              </motion.div>
            ) : (
              <div className="text-sm text-white/50 font-bold animate-pulse">
                استعد لمشاهدة الأسهم...
              </div>
            )}
          </div>
        ) : (
          <div
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            className="w-full h-72 rounded-3xl bg-slate-100 border-4 border-violet-500 shadow-2xl flex flex-col items-center justify-between p-4 cursor-crosshair touch-none select-none relative overflow-hidden"
          >
            {/* Drawing Notepad Paper Aesthetic */}
            <div className="text-slate-400 text-xs font-black tracking-widest uppercase">
              --- دفتر الرسم البياني / DRAWING PAD ---
            </div>

            {/* Drawn Gestures Display */}
            <div className="flex items-center gap-3 my-auto flex-wrap justify-center">
              {playerDrawn.map((dir, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 rounded-2xl bg-violet-600 text-white text-3xl font-black flex items-center justify-center shadow-lg animate-bounce"
                  style={{ animationDuration: '1s' }}
                >
                  {DIRECTION_ARROWS[dir].icon}
                </div>
              ))}
            </div>

            <div className="text-slate-600 text-xs font-bold bg-slate-200/80 px-4 py-1.5 rounded-full border border-slate-300">
              اسحب بأصبعك بلمسة سريعة في اتجاه الأسهم!
            </div>
          </div>
        )}
      </div>

      {/* Ad Offer Modal (When making a wrong gesture) */}
      <AnimatePresence>
        {showAdOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 text-center text-white shadow-2xl"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black mb-1">
                {isAr ? 'حركة خاطئة!' : 'Wrong Gesture!'}
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                {isAr
                  ? 'هل تريد مشاهدة إعلان قصير لإعادة مشاهدة حركة الأسهم وإعادة الرسم؟'
                  : 'Watch a short ad to replay the arrow sequence and retry drawing?'}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsAdModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Tv className="w-4 h-4" />
                  {isAr ? 'مشاهدة إعلان وإعادة الأسهم 🎬' : 'Watch Ad to Replay Arrows 🎬'}
                </button>

                <button
                  onClick={() => handleGameOver(level - 1)}
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  {isAr ? 'لا شكراً، إنهاء اللعبة' : 'No thanks, finish game'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rewarded Video Ad Modal */}
      <AdModal
        isOpen={isAdModalOpen}
        title={isAr ? 'مشاهدة إعلان لإعادة الأسهم' : 'Watch Ad to Replay Arrows'}
        rewardDescription={
          isAr
            ? 'استعد لمشاهدة حركة الأسهم مجدداً وبدء رسم السحبة!'
            : 'Get ready to watch the arrow sequence again and redraw!'
        }
        onReward={handleRewardGranted}
        onClose={() => setIsAdModalOpen(false)}
        language={settings.language}
      />

      {/* Ad Banner Space */}
      <AdBanner language={settings.language} />

      {/* Back Button */}
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
