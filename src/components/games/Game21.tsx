import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, User, Bot, AlertTriangle } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface Game21Props {
  mode: GameMode; // 'friend' or 'ai'
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

export const Game21: React.FC<Game21Props> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['21-game'] || getTranslations('en').games['21-game'];

  const [currentCount, setCurrentCount] = useState<number>(0);
  const [turn, setTurn] = useState<'p1' | 'p2' | 'ai'>('p1');
  const [history, setHistory] = useState<{ player: string; numbers: number[] }[]>([]);

  const isVsAI = mode === 'ai';
  const player1Name = settings.player1Name;
  const player2Name = isVsAI ? t.computerName : settings.player2Name;

  // AI turn logic
  useEffect(() => {
    if (turn === 'ai' && currentCount < 21) {
      const aiTimer = setTimeout(() => {
        makeAIMove();
      }, 1000);
      return () => clearTimeout(aiTimer);
    }
  }, [turn, currentCount]);

  const makeAIMove = () => {
    const C = currentCount;
    if (C >= 21) return;

    // AI Safe Targets: 4, 8, 12, 16, 20 (so opponent is forced to hit 21)
    const targets = [4, 8, 12, 16, 20];
    let choice = 1;

    // 90% smart strategy, 10% random mistake
    const isSmart = Math.random() < 0.9;

    if (isSmart) {
      const nextTarget = targets.find((t) => t > C && t <= C + 3);
      if (nextTarget) {
        choice = nextTarget - C;
      } else {
        choice = Math.floor(Math.random() * 3) + 1;
      }
    } else {
      choice = Math.floor(Math.random() * 3) + 1;
    }

    // Ensure choice doesn't exceed bounds
    if (C + choice > 21) {
      choice = 21 - C;
    }

    applyMove('ai', choice);
  };

  const applyMove = (playerRole: 'p1' | 'p2' | 'ai', amount: number) => {
    soundManager.playClick();
    const startNum = currentCount + 1;
    const addedNums: number[] = [];
    for (let i = 0; i < amount; i++) {
      addedNums.push(startNum + i);
    }

    const newCount = currentCount + amount;
    const pName =
      playerRole === 'p1' ? player1Name : playerRole === 'p2' ? player2Name : t.computerName;

    setCurrentCount(newCount);
    setHistory((prev) => [...prev, { player: pName, numbers: addedNums }]);

    // Check Loss
    if (newCount >= 21) {
      soundManager.playLose();
      const loser = pName;
      let winnerRole: 'player1' | 'player2' | 'ai' = 'player1';

      if (playerRole === 'p1') {
        winnerRole = isVsAI ? 'ai' : 'player2';
      } else {
        winnerRole = 'player1';
      }

      onFinish({
        gameId: '21-game',
        mode: isVsAI ? 'ai' : 'friend',
        player1: {
          playerName: player1Name,
          score: playerRole === 'p1' ? (t.reached21Lost || 'Reached 21 (Lost)') : (t.wonRound || 'Won round! 🎉'),
        },
        player2: {
          playerName: player2Name,
          score: playerRole !== 'p1' ? (t.reached21Lost || 'Reached 21 (Lost)') : (t.wonRound || 'Won round! 🎉'),
        },
        winner: winnerRole,
      });
      return;
    }

    // Switch Turn
    if (playerRole === 'p1') {
      setTurn(isVsAI ? 'ai' : 'p2');
    } else {
      setTurn('p1');
    }
  };

  const currentTurnName =
    turn === 'p1' ? player1Name : turn === 'p2' ? player2Name : t.computerName;

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh] p-4 text-white text-center select-none">
      {/* Turn Banner */}
      <div className="w-full max-w-md bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <Dices className="w-6 h-6 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="text-sm font-bold text-white/80">{t.turnNow || 'Turn'}:</span>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-extrabold text-sm shadow-md flex items-center gap-2">
          {turn === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
          <span>{currentTurnName}</span>
        </div>
      </div>

      {/* Main Counter Badge */}
      <div className="my-auto w-full max-w-md flex flex-col items-center">
        <motion.div
          key={currentCount}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full p-8 rounded-3xl bg-gradient-to-br from-purple-900/60 via-slate-900 to-indigo-900/60 border-2 border-purple-400/50 shadow-2xl flex flex-col items-center"
        >
          <span className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-2">
            {gTrans.currentCount}
          </span>

          <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 font-mono my-2 drop-shadow-md">
            {currentCount}
          </div>

          <p className="text-xs text-white/70 flex items-center gap-1 mt-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{gTrans.guide[3] || 'Who reaches 21 loses the game!'}</span>
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 w-full mt-8">
            {[1, 2, 3].map((num) => {
              const disabled = turn === 'ai' || currentCount + num > 21;
              return (
                <button
                  key={num}
                  disabled={disabled}
                  onClick={() => applyMove(turn as 'p1' | 'p2', num)}
                  className={`py-4 px-2 rounded-2xl font-black text-sm flex flex-col items-center justify-center transition-all shadow-lg border ${
                    disabled
                      ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 border-yellow-300 text-white hover:scale-105 active:scale-95 cursor-pointer'
                  }`}
                >
                  <span className="text-xl font-black mb-1">+{num}</span>
                  <span className="text-[10px] font-bold opacity-90">
                    {num === 1 ? gTrans.say1 : num === 2 ? gTrans.say2 : gTrans.say3}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* History Moves Log */}
        {history.length > 0 && (
          <div className="w-full mt-4 p-3 rounded-2xl bg-black/30 border border-white/10 max-h-32 overflow-y-auto text-xs space-y-1">
            {history.slice(-5).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-white/80 border-b border-white/5 pb-1">
                <span className="font-bold text-amber-300">{item.player}:</span>
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white font-bold">
                  {item.numbers.join(', ')}
                </span>
              </div>
            ))}
          </div>
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
