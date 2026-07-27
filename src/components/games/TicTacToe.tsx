import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home as HomeIcon,
  RotateCcw,
  Trophy,
  Users,
  Bot,
  Zap,
  Sparkles,
  RefreshCw,
  Award,
} from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface TicTacToeProps {
  settings: AppSettings;
  mode: GameMode;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

type Player = 'X' | 'O';
type BoardState = (Player | null)[];

// All possible winning combinations in 3x3 grid
const WINNING_COMBOS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left col
  [1, 4, 7], // middle col
  [2, 5, 8], // right col
  [0, 4, 8], // main diag
  [2, 4, 6], // anti diag
];

// Helper to check winner
function checkWinner(board: BoardState): { winner: Player; combo: number[] } | null {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, combo };
    }
  }
  return null;
}

// Check if board is full (Draw)
function isBoardFull(board: BoardState): boolean {
  return board.every((cell) => cell !== null);
}

// Minimax algorithm for unbeatable AI
function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  huPlayer: Player
): { score: number; index?: number } {
  const winInfo = checkWinner(board);
  if (winInfo?.winner === aiPlayer) return { score: 10 - depth };
  if (winInfo?.winner === huPlayer) return { score: depth - 10 };
  if (isBoardFull(board)) return { score: 0 };

  const emptyIndices: number[] = [];
  board.forEach((val, idx) => {
    if (val === null) emptyIndices.push(idx);
  });

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = emptyIndices[0];

    for (const idx of emptyIndices) {
      board[idx] = aiPlayer;
      const result = minimax(board, depth + 1, false, aiPlayer, huPlayer);
      board[idx] = null;

      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = idx;
      }
    }
    return { score: bestScore, index: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove = emptyIndices[0];

    for (const idx of emptyIndices) {
      board[idx] = huPlayer;
      const result = minimax(board, depth + 1, true, aiPlayer, huPlayer);
      board[idx] = null;

      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = idx;
      }
    }
    return { score: bestScore, index: bestMove };
  }
}

// 90% Smart AI choice (90% optimal minimax move, 10% random open cell)
function getAIMove(board: BoardState, aiPlayer: Player, huPlayer: Player): number {
  const emptyIndices: number[] = [];
  board.forEach((val, idx) => {
    if (val === null) emptyIndices.push(idx);
  });

  if (emptyIndices.length === 0) return -1;

  // 90% optimal move
  const useSmartMove = Math.random() < 0.9;

  if (useSmartMove) {
    const bestMoveObj = minimax(board, 0, true, aiPlayer, huPlayer);
    if (bestMoveObj.index !== undefined) {
      return bestMoveObj.index;
    }
  }

  // Fallback random move for the 10% chance
  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
}

export const TicTacToe: React.FC<TicTacToeProps> = ({
  settings,
  mode,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['tic-tac-toe'] || getTranslations('en').games['tic-tac-toe'];

  const isAIMode = mode === 'solo' || mode === 'ai';

  // Game state
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('X'); // X always starts
  const [winnerInfo, setWinnerInfo] = useState<{ winner: Player | 'DRAW'; combo?: number[] } | null>(null);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Score tracking
  const [xWins, setXWins] = useState<number>(0);
  const [oWins, setOWins] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);
  const [roundsPlayed, setRoundsPlayed] = useState<number>(1);

  // Sound & Vibrate on move
  const handleCellClick = (index: number) => {
    if (board[index] !== null || winnerInfo !== null || isAiThinking) {
      soundManager.vibrate(30);
      return;
    }

    soundManager.playClick();
    soundManager.vibrate(20);

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Check Win/Draw
    const win = checkWinner(newBoard);
    if (win) {
      setWinnerInfo({ winner: win.winner, combo: win.combo });
      soundManager.playSuccess();
      soundManager.vibrate(100);

      if (win.winner === 'X') setXWins((w) => w + 1);
      else setOWins((w) => w + 1);

      return;
    }

    if (isBoardFull(newBoard)) {
      setWinnerInfo({ winner: 'DRAW' });
      soundManager.playClick();
      setDraws((d) => d + 1);
      return;
    }

    // Switch Turn
    const nextTurn: Player = turn === 'X' ? 'O' : 'X';
    setTurn(nextTurn);
  };

  // AI Turn Trigger
  useEffect(() => {
    if (isAIMode && turn === 'O' && winnerInfo === null) {
      setIsAiThinking(true);

      const timer = setTimeout(() => {
        const aiIndex = getAIMove(board, 'O', 'X');
        if (aiIndex >= 0 && board[aiIndex] === null) {
          const newBoard = [...board];
          newBoard[aiIndex] = 'O';
          setBoard(newBoard);

          soundManager.playClick();
          soundManager.vibrate(15);

          const win = checkWinner(newBoard);
          if (win) {
            setWinnerInfo({ winner: win.winner, combo: win.combo });
            soundManager.playLose();
            soundManager.vibrate(100);
            setOWins((w) => w + 1);
          } else if (isBoardFull(newBoard)) {
            setWinnerInfo({ winner: 'DRAW' });
            setDraws((d) => d + 1);
          } else {
            setTurn('X');
          }
        }
        setIsAiThinking(false);
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [turn, board, isAIMode, winnerInfo]);

  // Next Round
  const handleNextRound = () => {
    soundManager.playClick();
    setBoard(Array(9).fill(null));
    setWinnerInfo(null);
    setTurn('X');
    setIsAiThinking(false);
    setRoundsPlayed((r) => r + 1);
  };

  // Complete Game Series
  const handleFinishGameSeries = () => {
    soundManager.playClick();

    if (isAIMode) {
      const score = xWins * 100 - oWins * 50;
      onFinish({
        gameId: 'tic-tac-toe',
        mode: 'solo',
        player1: {
          playerName: settings.player1Name,
          score: Math.max(0, score),
          secondaryMetric: `X: ${xWins} | O: ${oWins} | ${draws}`,
        },
        grade: xWins > oWins ? t.excellent : t.good,
      });
    } else {
      const winner =
        xWins > oWins ? 'player1' : oWins > xWins ? 'player2' : 'draw';

      onFinish({
        gameId: 'tic-tac-toe',
        mode: 'friend',
        player1: {
          playerName: settings.player1Name,
          score: xWins * 100,
          secondaryMetric: `${xWins} ${t.wins}`,
        },
        player2: {
          playerName: settings.player2Name,
          score: oWins * 100,
          secondaryMetric: `${oWins} ${t.wins}`,
        },
        winner,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-violet-950 text-white p-4 md:p-6 select-none flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-10 w-80 h-80 bg-violet-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 -right-10 w-80 h-80 bg-fuchsia-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header Bar */}
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
            <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-black text-xs md:text-sm shadow-md flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>{gTrans.round} {roundsPlayed}</span>
            </span>

            {isAIMode && (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30 flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" />
                <span>90% AI</span>
              </span>
            )}
          </div>

          <button
            onClick={handleFinishGameSeries}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer active:scale-95"
          >
            {t.finishGame}
          </button>
        </div>

        {/* Players Status / Score Board */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div
            className={`p-3 rounded-2xl border transition-all text-center ${
              turn === 'X' && !winnerInfo
                ? 'bg-violet-500/20 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-102'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <span className="text-xl md:text-2xl font-black text-violet-400 block">❌</span>
            <span className="text-xs font-bold text-white/80 block truncate mt-0.5">
              {settings.player1Name}
            </span>
            <span className="text-sm font-black text-violet-300 block">{xWins}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col justify-center">
            <span className="text-xs font-bold text-white/50 block">{gTrans.draw}</span>
            <span className="text-lg font-black text-amber-300">{draws}</span>
          </div>

          <div
            className={`p-3 rounded-2xl border transition-all text-center ${
              turn === 'O' && !winnerInfo
                ? 'bg-fuchsia-500/20 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)] scale-102'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <span className="text-xl md:text-2xl font-black text-fuchsia-400 block">⭕</span>
            <span className="text-xs font-bold text-white/80 block truncate mt-0.5">
              {isAIMode ? t.computerName : settings.player2Name}
            </span>
            <span className="text-sm font-black text-fuchsia-300 block">{oWins}</span>
          </div>
        </div>
      </div>

      {/* Turn Indicator Banner */}
      <div className="max-w-md mx-auto w-full text-center z-10 my-2">
        {winnerInfo ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-black text-base shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            <span>
              {winnerInfo.winner === 'X'
                ? `${settings.player1Name} ${gTrans.xWins}`
                : winnerInfo.winner === 'O'
                ? `${isAIMode ? t.computerName : settings.player2Name} ${gTrans.oWins}`
                : gTrans.draw}
            </span>
          </motion.div>
        ) : isAiThinking ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 font-bold text-xs border border-fuchsia-500/30">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{gTrans.aiTurn}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 text-white/90 font-bold text-xs border border-white/15">
            <span>
              {turn === 'X'
                ? `${settings.player1Name} (${gTrans.yourTurn})`
                : `${isAIMode ? t.computerName : settings.player2Name} (${gTrans.yourTurn})`}
            </span>
          </div>
        )}
      </div>

      {/* Main 3x3 Tic-Tac-Toe Grid */}
      <div className="max-w-xs md:max-w-sm mx-auto w-full aspect-square z-10 my-auto p-3 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] grid grid-cols-3 gap-3 relative">
        {board.map((cellValue, idx) => {
          const isWinningCell = winnerInfo?.combo?.includes(idx);

          return (
            <button
              key={`cell-${idx}`}
              disabled={cellValue !== null || winnerInfo !== null || isAiThinking}
              onClick={() => handleCellClick(idx)}
              className={`relative rounded-2xl font-black text-4xl md:text-5xl flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
                isWinningCell
                  ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.8)] scale-105 z-20 border-2 border-white'
                  : cellValue === 'X'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-400/40 shadow-[inset_0_0_15px_rgba(139,92,246,0.3)]'
                  : cellValue === 'O'
                  ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40 shadow-[inset_0_0_15px_rgba(217,70,239,0.3)]'
                  : 'bg-white/5 hover:bg-white/15 border border-white/10 text-transparent active:scale-95'
              }`}
            >
              {cellValue && (
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="select-none"
                >
                  {cellValue === 'X' ? '❌' : '⭕'}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {/* Round Controls Footer */}
      <div className="max-w-md mx-auto w-full z-10 pt-2 flex items-center justify-center gap-3">
        <button
          onClick={handleNextRound}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:brightness-110 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{winnerInfo ? 'جولة جديدة (New Round)' : gTrans.round + ' جديد'}</span>
        </button>
      </div>
    </div>
  );
};
