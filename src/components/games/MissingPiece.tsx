import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Puzzle, Eye, HelpCircle } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface MissingPieceProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

interface Item {
  id: string;
  emoji: string;
  name: string;
}

const ITEM_POOL: Item[] = [
  { id: 'apple', emoji: '🍎', name: 'تفاحة' },
  { id: 'banana', emoji: '🍌', name: 'موزة' },
  { id: 'carrot', emoji: '🥕', name: 'جزرة' },
  { id: 'cat', emoji: '🐱', name: 'قطة' },
  { id: 'star', emoji: '⭐️', name: 'نجمة' },
  { id: 'gem', emoji: '💎', name: 'جوهرة' },
  { id: 'rocket', emoji: '🚀', name: 'صاروخ' },
  { id: 'crown', emoji: '👑', name: 'تاج' },
  { id: 'pizza', emoji: '🍕', name: 'بيتزا' },
  { id: 'donut', emoji: '🍩', name: 'دونات' },
];

export const MissingPiece: React.FC<MissingPieceProps> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['missing-piece'] || getTranslations('en').games['missing-piece'];

  const [level, setLevel] = useState<number>(1);
  const [phase, setPhase] = useState<'memorize' | 'find'>('memorize');
  const [currentItems, setCurrentItems] = useState<Item[]>([]);
  const [missingIndex, setMissingIndex] = useState<number>(0);
  const [missingItem, setMissingItem] = useState<Item | null>(null);
  const [candidates, setCandidates] = useState<Item[]>([]);
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [p1MaxLevel, setP1MaxLevel] = useState<number | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startNewLevel(1);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startNewLevel = (lvl: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const itemCount = Math.min(lvl + 3, ITEM_POOL.length); // Level 1 = 4 items
    // Shuffle pool
    const shuffled = [...ITEM_POOL].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, itemCount);

    // Pick missing item index
    const mIdx = Math.floor(Math.random() * itemCount);
    const mItem = selected[mIdx];

    // Candidate options (missing item + 3 distractors)
    const distractors = ITEM_POOL.filter((i) => i.id !== mItem.id).sort(
      () => Math.random() - 0.5
    ).slice(0, 3);
    const cOptions = [mItem, ...distractors].sort(() => Math.random() - 0.5);

    setCurrentItems(selected);
    setMissingIndex(mIdx);
    setMissingItem(mItem);
    setCandidates(cOptions);
    setLevel(lvl);
    setPhase('memorize');

    // Timer: 3 seconds memorize -> transition to find
    timeoutRef.current = setTimeout(() => {
      setPhase('find');
      soundManager.playSuccess();
    }, 3000);
  };

  const handleSelectCandidate = (candidate: Item) => {
    if (phase !== 'find' || !missingItem) return;

    if (candidate.id === missingItem.id) {
      soundManager.playSuccess();
      // Correct choice!
      if (level < 5) {
        setTimeout(() => {
          startNewLevel(level + 1);
        }, 600);
      } else {
        // Completed all 5 stages!
        handleGameOver(5);
      }
    } else {
      // Wrong Choice!
      soundManager.playError();
      handleGameOver(level - 1);
    }
  };

  const handleGameOver = (finalLevel: number) => {
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
        gameId: 'missing-piece',
        mode: 'friend',
        player1: {
          playerName: settings.player1Name,
          score: `المرحلة ${l1}`,
        },
        player2: {
          playerName: settings.player2Name,
          score: `المرحلة ${l2}`,
        },
        winner,
      });
    } else {
      // Solo Mode
      let grade = t.tryAgain;
      if (finalLevel >= 5) grade = t.excellent;
      else if (finalLevel >= 3) grade = t.veryGood;
      else if (finalLevel >= 1) grade = t.good;

      onFinish({
        gameId: 'missing-piece',
        mode: 'solo',
        player1: {
          playerName: settings.player1Name,
          score: `المرحلة ${finalLevel}`,
          secondaryMetric: 'أعلى مرحلة تم اكتشاف القطعة المفقودة بها',
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
          <Puzzle className="w-6 h-6 text-lime-400" />
          <h2 className="text-xl font-black">{gTrans.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-xs font-black">
            المرحلة {level} / 5
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold">
            {currentPlayerName}
          </span>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="my-auto w-full max-w-md flex flex-col items-center">
        <div className="mb-4">
          <span className="text-sm font-bold text-lime-300 flex items-center gap-1.5 justify-center">
            <Eye className="w-4 h-4 animate-bounce" />
            {phase === 'memorize' ? gTrans.memorizeItems : gTrans.findMissing}
          </span>
        </div>

        {/* Display Items Board */}
        <div className="w-full p-6 rounded-3xl bg-slate-900/90 border-2 border-lime-400/50 shadow-2xl flex flex-wrap items-center justify-center gap-3 min-h-[160px]">
          {currentItems.map((item, idx) => {
            const isMissing = phase === 'find' && idx === missingIndex;
            return (
              <AnimatePresence key={idx}>
                {isMissing ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-2xl bg-lime-500/20 border-2 border-dashed border-lime-400 flex items-center justify-center text-lime-300 shadow-inner"
                  >
                    <HelpCircle className="w-8 h-8 animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl shadow-md"
                  >
                    {item.emoji}
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Candidate Choices Tray (Visible in 'find' phase) */}
        {phase === 'find' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-6 p-4 rounded-2xl bg-slate-950 border border-white/20 shadow-xl"
          >
            <span className="text-xs font-bold text-white/70 block mb-3">
              اختر القطعة التي اختفت لإعادتها إلى المكان الفارغ:
            </span>
            <div className="grid grid-cols-4 gap-3">
              {candidates.map((cand) => (
                <button
                  key={cand.id}
                  onClick={() => handleSelectCandidate(cand)}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-4xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                >
                  {cand.emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

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
