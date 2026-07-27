import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Tv, RotateCcw, AlertTriangle } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';
import { AdModal } from '../AdModal';
import { AdBanner } from '../AdBanner';

interface MemoryOrderProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

const PADS = [
  { id: 0, color: 'bg-red-500 border-red-300 shadow-red-500/50', freq: 523.25 }, // C5
  { id: 1, color: 'bg-blue-500 border-blue-300 shadow-blue-500/50', freq: 659.25 }, // E5
  { id: 2, color: 'bg-emerald-500 border-emerald-300 shadow-emerald-500/50', freq: 783.99 }, // G5
  { id: 3, color: 'bg-yellow-400 border-yellow-200 shadow-yellow-400/50', freq: 1046.5 }, // C6
];

export const MemoryOrder: React.FC<MemoryOrderProps> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['memory-order'] || getTranslations('en').games['memory-order'];
  const isAr = settings.language === 'ar';

  const [level, setLevel] = useState<number>(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [activePad, setActivePad] = useState<number | null>(null);
  const [phase, setPhase] = useState<'watch' | 'repeat'>('watch');
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [p1MaxLevel, setP1MaxLevel] = useState<number | null>(null);

  // Ad Revive States
  const [showAdOffer, setShowAdOffer] = useState<boolean>(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState<boolean>(false);
  const [hasUsedAdRevive, setHasUsedAdRevive] = useState<boolean>(false);

  // Generate sequence on level start
  useEffect(() => {
    generateNextLevel(1);
  }, []);

  const generateNextLevel = (lvl: number) => {
    const seqLength = lvl + 2; // Level 1 = 3 pads
    const newSeq: number[] = [];
    for (let i = 0; i < seqLength; i++) {
      newSeq.push(Math.floor(Math.random() * 4));
    }
    setSequence(newSeq);
    setPlayerInput([]);
    setLevel(lvl);
    setPhase('watch');

    // Play sequence animation
    playSequenceAnimation(newSeq);
  };

  const playSequenceAnimation = (seq: number[]) => {
    setPhase('watch');
    seq.forEach((padIdx, idx) => {
      setTimeout(() => {
        setActivePad(padIdx);
        soundManager.playTone(PADS[padIdx].freq, 0.3);
        setTimeout(() => {
          setActivePad(null);
        }, 350);
      }, (idx + 1) * 600);
    });

    // Switch to repeat phase after sequence finishes
    setTimeout(() => {
      setPhase('repeat');
    }, (seq.length + 1) * 600);
  };

  const handlePadClick = (padIdx: number) => {
    if (phase !== 'repeat') return;

    soundManager.playTone(PADS[padIdx].freq, 0.2);
    soundManager.vibrate(30);

    const nextInput = [...playerInput, padIdx];
    setPlayerInput(nextInput);

    const stepIdx = nextInput.length - 1;

    // Check correctness
    if (nextInput[stepIdx] !== sequence[stepIdx]) {
      // Wrong Input!
      soundManager.playError();

      // Offer Ad Revive if not used yet in this level
      if (!hasUsedAdRevive) {
        setShowAdOffer(true);
      } else {
        handleGameOver(level - 1);
      }
      return;
    }

    // Check level completion
    if (nextInput.length === sequence.length) {
      soundManager.playSuccess();
      setHasUsedAdRevive(false); // Reset revive allowance for next level
      setTimeout(() => {
        generateNextLevel(level + 1);
      }, 800);
    }
  };

  const handleRewardGranted = () => {
    setHasUsedAdRevive(true);
    setShowAdOffer(false);
    setPlayerInput([]);
    
    // Replay sequence for player to watch again
    setTimeout(() => {
      playSequenceAnimation(sequence);
    }, 400);
  };

  const handleGameOver = (finalLevel: number) => {
    setShowAdOffer(false);
    if (mode === 'friend' && activePlayer === 1) {
      setP1MaxLevel(finalLevel);
      setActivePlayer(2);
      setHasUsedAdRevive(false);
      generateNextLevel(1);
    } else if (mode === 'friend' && activePlayer === 2) {
      const l1 = p1MaxLevel || 0;
      const l2 = finalLevel;

      let winner: 'player1' | 'player2' | 'draw' = 'draw';
      if (l1 > l2) winner = 'player1';
      else if (l2 > l1) winner = 'player2';

      onFinish({
        gameId: 'memory-order',
        mode: 'friend',
        player1: {
          playerName: settings.player1Name,
          score: isAr ? `المستوى ${l1}` : `Level ${l1}`,
        },
        player2: {
          playerName: settings.player2Name,
          score: isAr ? `المستوى ${l2}` : `Level ${l2}`,
        },
        winner,
      });
    } else {
      // Solo Mode
      let grade = t.tryAgain;
      if (finalLevel >= 8) grade = t.excellent;
      else if (finalLevel >= 5) grade = t.veryGood;
      else if (finalLevel >= 3) grade = t.good;

      onFinish({
        gameId: 'memory-order',
        mode: 'solo',
        player1: {
          playerName: settings.player1Name,
          score: isAr ? `المستوى ${finalLevel}` : `Level ${finalLevel}`,
          secondaryMetric: isAr ? 'أعلى تسلسل تم حفظه بنجاح' : 'Highest sequence memorized',
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
          <Brain className="w-6 h-6 text-cyan-400 animate-pulse" />
          <h2 className="text-xl font-black">{gTrans.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-black">
            {isAr ? `المستوى ${level}` : `Level ${level}`}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold">
            {currentPlayerName}
          </span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="my-auto w-full max-w-md flex flex-col items-center">
        <div className="mb-6">
          <span className="text-sm font-bold text-cyan-300 flex items-center gap-1.5 justify-center">
            <Sparkles className="w-4 h-4" />
            {phase === 'watch' ? gTrans.watchSequence : gTrans.repeatSequence}
          </span>
        </div>

        {/* 2x2 Pad Grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs aspect-square p-4 rounded-3xl bg-slate-900/80 border-2 border-cyan-400/40 shadow-2xl">
          {PADS.map((pad) => {
            const isActive = activePad === pad.id;
            return (
              <motion.button
                key={pad.id}
                whileTap={{ scale: 0.92 }}
                onClick={() => handlePadClick(pad.id)}
                className={`rounded-2xl border-4 transition-all shadow-xl cursor-pointer ${pad.color} ${
                  isActive
                    ? 'brightness-150 scale-105 ring-4 ring-white shadow-[0_0_25px_rgba(255,255,255,0.8)]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Ad Offer Modal (When making a mistake) */}
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
                {isAr ? 'أخطأت في التسلسل!' : 'Wrong Sequence!'}
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                {isAr
                  ? 'هل تريد مشاهدة إعلان إضافي لإعادة عرض التسلسل وحفظ الألوان من جديد؟'
                  : 'Watch a short ad to replay the sequence and get a second chance?'}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsAdModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Tv className="w-4 h-4" />
                  {isAr ? 'مشاهدة إعلان لإعادة التسلسل 🎬' : 'Watch Ad to Replay Sequence 🎬'}
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
        title={isAr ? 'مشاهدة إعلان لإعادة المحاولة' : 'Watch Ad to Revive'}
        rewardDescription={
          isAr
            ? 'تمت إعادة التسلسل! استعد لمشاهدته مجدداً وحفظ الترتيب'
            : 'Sequence replayed! Get ready to watch and memorize again'
        }
        onReward={handleRewardGranted}
        onClose={() => setIsAdModalOpen(false)}
        language={settings.language}
      />

      {/* Banner Ad Space */}
      <AdBanner language={settings.language} />

      {/* Back Button */}
      <div className="w-full max-w-md pt-2">
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

