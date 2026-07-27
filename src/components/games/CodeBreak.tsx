import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { KeyRound, Delete, Check } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface CodeBreakProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

interface AttemptLog {
  guess: string;
  feedback: { digit: string; status: 'green' | 'blue' | 'red' }[];
}

export const CodeBreak: React.FC<CodeBreakProps> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['code-break'] || getTranslations('en').games['code-break'];

  const [secretCode, setSecretCode] = useState<string>('1234');
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [history, setHistory] = useState<AttemptLog[]>([]);
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [p1Attempts, setP1Attempts] = useState<number | null>(null);

  useEffect(() => {
    generateNewSecretCode();
  }, [activePlayer]);

  const generateNewSecretCode = () => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    // Shuffle digits
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    const code = digits.slice(0, 4).join('');
    setSecretCode(code);
    setCurrentGuess('');
    setHistory([]);
  };

  const handleKeyPress = (digit: string) => {
    if (currentGuess.length < 4) {
      soundManager.playClick();
      setCurrentGuess((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    if (currentGuess.length > 0) {
      soundManager.playClick();
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 4) return;

    soundManager.playClick();

    // Evaluate feedback
    const secretArr = secretCode.split('');
    const guessArr = currentGuess.split('');

    const feedbackArr: { digit: string; status: 'green' | 'blue' | 'red' }[] = [];

    guessArr.forEach((digit, idx) => {
      if (digit === secretArr[idx]) {
        feedbackArr.push({ digit, status: 'green' });
      } else if (secretArr.includes(digit)) {
        feedbackArr.push({ digit, status: 'blue' });
      } else {
        feedbackArr.push({ digit, status: 'red' });
      }
    });

    const newLog: AttemptLog = {
      guess: currentGuess,
      feedback: feedbackArr,
    };

    const newHistory = [...history, newLog];
    setHistory(newHistory);
    setCurrentGuess('');

    // Check Win
    const isCracked = feedbackArr.every((f) => f.status === 'green');

    if (isCracked) {
      soundManager.playWin();
      const attemptsCount = newHistory.length;

      if (mode === 'friend' && activePlayer === 1) {
        setP1Attempts(attemptsCount);
        setActivePlayer(2);
      } else if (mode === 'friend' && activePlayer === 2) {
        const att1 = p1Attempts || 0;
        const att2 = attemptsCount;

        let winner: 'player1' | 'player2' | 'draw' = 'draw';
        if (att1 < att2) winner = 'player1';
        else if (att2 < att1) winner = 'player2';

        onFinish({
          gameId: 'code-break',
          mode: 'friend',
          targetOrRef: secretCode,
          player1: {
            playerName: settings.player1Name,
            score: `${att1} محاولات`,
          },
          player2: {
            playerName: settings.player2Name,
            score: `${att2} محاولات`,
          },
          winner,
        });
      } else {
        // Solo Mode
        let grade = t.tryAgain;
        if (attemptsCount <= 4) grade = t.excellent;
        else if (attemptsCount <= 7) grade = t.veryGood;
        else if (attemptsCount <= 10) grade = t.good;

        onFinish({
          gameId: 'code-break',
          mode: 'solo',
          targetOrRef: secretCode,
          player1: {
            playerName: settings.player1Name,
            score: `${attemptsCount} محاولات`,
            secondaryMetric: 'رمز سري مكسور بنجاح 🎉',
          },
          winner: 'player1',
          grade,
        });
      }
    } else {
      soundManager.playTick();
    }
  };

  const currentPlayerName =
    activePlayer === 1 ? settings.player1Name : settings.player2Name;

  return (
    <div className="flex flex-col items-center justify-between min-h-[80vh] p-4 text-white text-center select-none">
      {/* Header Info */}
      <div className="w-full max-w-md bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-sky-400" />
          <h2 className="text-xl font-black">{gTrans.title}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-sky-400 text-slate-950 text-xs font-black">
          {currentPlayerName}
        </span>
      </div>

      {/* Main Game Stage */}
      <div className="my-auto w-full max-w-md flex flex-col items-center my-3">
        {/* Color Legend (ALWAYS VISIBLE ABOVE PLAY AREA) */}
        <div className="w-full p-3 rounded-2xl bg-slate-900/90 border border-sky-400/40 text-[11px] font-bold space-y-1 mb-3 text-right rtl:text-right">
          <div className="text-sky-300 text-center font-extrabold mb-1">
            دليل مؤشرات الألوان / Color Legend:
          </div>
          <div className="text-emerald-400">{gTrans.legendGreen}</div>
          <div className="text-blue-400">{gTrans.legendBlue}</div>
          <div className="text-rose-400">{gTrans.legendRed}</div>
        </div>

        {/* Current Guess Slot Display */}
        <div className="w-full p-4 rounded-2xl bg-slate-950 border-2 border-sky-400/50 flex items-center justify-center gap-3 mb-3 shadow-inner">
          {[0, 1, 2, 3].map((idx) => {
            const digit = currentGuess[idx] || '';
            return (
              <div
                key={idx}
                className="w-12 h-14 rounded-xl bg-white/10 border-2 border-sky-400/30 flex items-center justify-center text-2xl font-black font-mono text-sky-200"
              >
                {digit}
              </div>
            );
          })}
        </div>

        {/* Previous History Log */}
        {history.length > 0 && (
          <div className="w-full p-3 rounded-2xl bg-black/40 border border-white/10 max-h-32 overflow-y-auto space-y-1.5 mb-3 text-xs">
            <div className="text-white/60 font-bold mb-1 text-center">{gTrans.history} ({history.length}):</div>
            {history.map((log, lIdx) => (
              <div key={lIdx} className="flex items-center justify-center gap-2 bg-white/5 py-1.5 px-3 rounded-xl">
                <span className="text-white/50 text-[10px] font-mono">#{lIdx + 1}</span>
                <div className="flex gap-1.5 font-mono font-black text-sm">
                  {log.feedback.map((fb, fIdx) => (
                    <span
                      key={fIdx}
                      className={`px-2 py-0.5 rounded ${
                        fb.status === 'green'
                          ? 'bg-emerald-500 text-slate-950'
                          : fb.status === 'blue'
                          ? 'bg-blue-500 text-white'
                          : 'bg-rose-500/80 text-white'
                      }`}
                    >
                      {fb.digit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleKeyPress(digit)}
              className="py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-black text-lg text-white transition-all active:scale-95 cursor-pointer"
            >
              {digit}
            </button>
          ))}

          <button
            onClick={handleDelete}
            className="py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 font-bold text-rose-300 flex items-center justify-center cursor-pointer"
          >
            <Delete className="w-5 h-5" />
          </button>

          <button
            disabled={currentGuess.length !== 4}
            onClick={handleSubmitGuess}
            className={`py-3 rounded-xl font-black text-slate-950 flex items-center justify-center cursor-pointer ${
              currentGuess.length === 4
                ? 'bg-gradient-to-r from-sky-400 to-emerald-400 shadow-md hover:scale-105 active:scale-95'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <Check className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </div>

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
