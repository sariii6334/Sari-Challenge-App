import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, CheckCircle, XCircle } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface ColorTrapProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

interface ColorOption {
  key: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  hex: string;
  bgClass: string;
}

const COLORS: ColorOption[] = [
  { key: 'red', hex: '#ef4444', bgClass: 'bg-red-500 hover:bg-red-600' },
  { key: 'blue', hex: '#3b82f6', bgClass: 'bg-blue-500 hover:bg-blue-600' },
  { key: 'green', hex: '#10b981', bgClass: 'bg-emerald-500 hover:bg-emerald-600' },
  { key: 'yellow', hex: '#eab308', bgClass: 'bg-yellow-400 hover:bg-yellow-500 text-slate-950' },
  { key: 'purple', hex: '#a855f7', bgClass: 'bg-purple-500 hover:bg-purple-600' },
  { key: 'orange', hex: '#f97316', bgClass: 'bg-orange-500 hover:bg-orange-600' },
];

const TOTAL_ROUNDS = 10;

export const ColorTrap: React.FC<ColorTrapProps> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['color-trap'] || getTranslations('en').games['color-trap'];

  const [round, setRound] = useState<number>(1);
  const [wordKey, setWordKey] = useState<ColorOption['key']>('red');
  const [inkKey, setInkKey] = useState<ColorOption['key']>('blue');
  const [p1Correct, setP1Correct] = useState<number>(0);
  const [p2Correct, setP2Correct] = useState<number>(0);
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    generateNewTrap();
  }, [round]);

  const generateNewTrap = () => {
    // Pick word and ink such that ink != word
    const wordIdx = Math.floor(Math.random() * COLORS.length);
    let inkIdx = Math.floor(Math.random() * COLORS.length);
    while (inkIdx === wordIdx) {
      inkIdx = Math.floor(Math.random() * COLORS.length);
    }

    setWordKey(COLORS[wordIdx].key);
    setInkKey(COLORS[inkIdx].key);
    setFeedback(null);
  };

  const handleChoice = (chosenKey: ColorOption['key']) => {
    if (feedback !== null) return; // Debounce

    const isCorrect = chosenKey === inkKey;

    if (isCorrect) {
      soundManager.playSuccess();
      setFeedback('correct');
      if (activePlayer === 1) setP1Correct((prev) => prev + 1);
      else setP2Correct((prev) => prev + 1);
    } else {
      soundManager.playError();
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (round < TOTAL_ROUNDS) {
        setRound((prev) => prev + 1);
      } else {
        // Player finished 10 rounds
        if (mode === 'friend' && activePlayer === 1) {
          setActivePlayer(2);
          setRound(1);
        } else {
          // Finish Game
          finishGame(isCorrect);
        }
      }
    }, 400);
  };

  const finishGame = (lastWasCorrect: boolean) => {
    const finalP1 = activePlayer === 1 ? (lastWasCorrect ? p1Correct + 1 : p1Correct) : p1Correct;
    const finalP2 = activePlayer === 2 ? (lastWasCorrect ? p2Correct + 1 : p2Correct) : p2Correct;

    if (mode === 'friend') {
      let winner: 'player1' | 'player2' | 'draw' = 'draw';
      if (finalP1 > finalP2) winner = 'player1';
      else if (finalP2 > finalP1) winner = 'player2';

      onFinish({
        gameId: 'color-trap',
        mode: 'friend',
        player1: {
          playerName: settings.player1Name,
          score: `${finalP1} / ${TOTAL_ROUNDS}`,
        },
        player2: {
          playerName: settings.player2Name,
          score: `${finalP2} / ${TOTAL_ROUNDS}`,
        },
        winner,
      });
    } else {
      // Solo Mode
      let grade = t.tryAgain;
      if (finalP1 >= 9) grade = t.excellent;
      else if (finalP1 >= 7) grade = t.veryGood;
      else if (finalP1 >= 5) grade = t.good;

      onFinish({
        gameId: 'color-trap',
        mode: 'solo',
        player1: {
          playerName: settings.player1Name,
          score: `${finalP1} / ${TOTAL_ROUNDS}`,
          secondaryMetric: `نسبة التركيز: ${Math.round((finalP1 / TOTAL_ROUNDS) * 100)}%`,
        },
        winner: 'player1',
        grade,
      });
    }
  };

  const inkColorHex = COLORS.find((c) => c.key === inkKey)?.hex || '#ffffff';
  const wordText = gTrans[wordKey];
  const currentPlayerName =
    activePlayer === 1 ? settings.player1Name : settings.player2Name;

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh] p-4 text-white text-center select-none">
      {/* Header Info */}
      <div className="w-full max-w-md bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-6 h-6 text-fuchsia-400" />
          <h2 className="text-xl font-black">{gTrans.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-fuchsia-400 text-slate-950 text-xs font-black">
            {round} / {TOTAL_ROUNDS}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold">
            {currentPlayerName}
          </span>
        </div>
      </div>

      {/* Trap Card */}
      <div className="my-auto w-full max-w-md flex flex-col items-center">
        <p className="text-xs font-bold text-yellow-300 mb-4 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/30">
          {gTrans.clickInkColor}
        </p>

        <motion.div
          key={`${round}-${activePlayer}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full p-8 rounded-3xl bg-slate-900/90 border-2 border-fuchsia-400/50 shadow-2xl flex flex-col items-center relative overflow-hidden"
        >
          {/* Main Stroop Word */}
          <div
            style={{ color: inkColorHex }}
            className="text-6xl font-black tracking-wider my-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-colors duration-200"
          >
            {wordText}
          </div>

          {/* Feedback Icon Overlay */}
          {feedback && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
              {feedback === 'correct' ? (
                <CheckCircle className="w-20 h-20 text-emerald-400 animate-bounce" />
              ) : (
                <XCircle className="w-20 h-20 text-red-500 animate-bounce" />
              )}
            </div>
          )}

          {/* Color Palette Choice Buttons */}
          <div className="grid grid-cols-3 gap-3 w-full mt-4">
            {COLORS.map((col) => (
              <button
                key={col.key}
                onClick={() => handleChoice(col.key)}
                className={`py-4 px-2 rounded-2xl font-black text-sm text-white shadow-xl transition-all border border-white/20 hover:scale-105 active:scale-95 cursor-pointer ${col.bgClass}`}
              >
                <span>{gTrans[col.key]}</span>
              </button>
            ))}
          </div>
        </motion.div>
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
