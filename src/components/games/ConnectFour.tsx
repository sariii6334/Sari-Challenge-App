import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  Bot,
  Users,
  Trophy,
  Sparkles,
  Zap,
  Award,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface ConnectFourProps {
  settings: AppSettings;
  mode: GameMode; // 'friend' | 'ai'
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

type AIDifficulty = 'easy' | 'medium' | 'hard';
type PlayerVal = 1 | 2; // 1 = Yellow (Player 1), 2 = Pink (Player 2 / AI)
type BoardState = number[][]; // 6 rows x 7 cols

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;

// All 4-in-a-row winning directions check
function checkWinner(board: BoardState): { winner: PlayerVal; cells: [number, number][] } | null {
  // 1. Horizontal (6 rows x 4 cols start)
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const val = board[r][c];
      if (
        val !== EMPTY &&
        val === board[r][c + 1] &&
        val === board[r][c + 2] &&
        val === board[r][c + 3]
      ) {
        return {
          winner: val as PlayerVal,
          cells: [
            [r, c],
            [r, c + 1],
            [r, c + 2],
            [r, c + 3],
          ],
        };
      }
    }
  }

  // 2. Vertical (3 rows start x 7 cols)
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS; c++) {
      const val = board[r][c];
      if (
        val !== EMPTY &&
        val === board[r + 1][c] &&
        val === board[r + 2][c] &&
        val === board[r + 3][c]
      ) {
        return {
          winner: val as PlayerVal,
          cells: [
            [r, c],
            [r + 1, c],
            [r + 2, c],
            [r + 3, c],
          ],
        };
      }
    }
  }

  // 3. Positive Diagonal (bottom-left to top-right)
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const val = board[r][c];
      if (
        val !== EMPTY &&
        val === board[r - 1][c + 1] &&
        val === board[r - 2][c + 2] &&
        val === board[r - 3][c + 3]
      ) {
        return {
          winner: val as PlayerVal,
          cells: [
            [r, c],
            [r - 1, c + 1],
            [r - 2, c + 2],
            [r - 3, c + 3],
          ],
        };
      }
    }
  }

  // 4. Negative Diagonal (top-left to bottom-right)
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const val = board[r][c];
      if (
        val !== EMPTY &&
        val === board[r + 1][c + 1] &&
        val === board[r + 2][c + 2] &&
        val === board[r + 3][c + 3]
      ) {
        return {
          winner: val as PlayerVal,
          cells: [
            [r, c],
            [r + 1, c + 1],
            [r + 2, c + 2],
            [r + 3, c + 3],
          ],
        };
      }
    }
  }

  return null;
}

// Get lowest available row in column
function getLowestEmptyRow(board: BoardState, col: number): number {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === EMPTY) {
      return r;
    }
  }
  return -1;
}

// Get list of columns that aren't full
function getValidColumns(board: BoardState): number[] {
  const validCols: number[] = [];
  for (let c = 0; c < COLS; c++) {
    if (board[0][c] === EMPTY) {
      validCols.push(c);
    }
  }
  return validCols;
}

// Is board completely full?
function isBoardFull(board: BoardState): boolean {
  for (let c = 0; c < COLS; c++) {
    if (board[0][c] === EMPTY) return false;
  }
  return true;
}

// Evaluate a window of 4 cells for Minimax Heuristics
function evaluateWindow(window: number[], aiPlayer: PlayerVal): number {
  let score = 0;
  const oppPlayer = aiPlayer === 1 ? 2 : 1;

  const aiCount = window.filter((cell) => cell === aiPlayer).length;
  const oppCount = window.filter((cell) => cell === oppPlayer).length;
  const emptyCount = window.filter((cell) => cell === EMPTY).length;

  if (aiCount === 4) {
    score += 100000;
  } else if (aiCount === 3 && emptyCount === 1) {
    score += 120;
  } else if (aiCount === 2 && emptyCount === 2) {
    score += 12;
  }

  if (oppCount === 3 && emptyCount === 1) {
    score -= 4000; // Critical threat block!
  } else if (oppCount === 2 && emptyCount === 2) {
    score -= 15;
  }

  return score;
}

// Heuristic score for full board
function scoreBoard(board: BoardState, aiPlayer: PlayerVal): number {
  let score = 0;

  // Center column score bias
  const centerArray = [];
  for (let r = 0; r < ROWS; r++) {
    centerArray.push(board[r][3]);
  }
  const centerCount = centerArray.filter((cell) => cell === aiPlayer).length;
  score += centerCount * 6;

  // Horizontal scoring
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const window = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]];
      score += evaluateWindow(window, aiPlayer);
    }
  }

  // Vertical scoring
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS - 3; r++) {
      const window = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]];
      score += evaluateWindow(window, aiPlayer);
    }
  }

  // Positive diagonal scoring
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const window = [board[r][c], board[r - 1][c + 1], board[r - 2][c + 2], board[r - 3][c + 3]];
      score += evaluateWindow(window, aiPlayer);
    }
  }

  // Negative diagonal scoring
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const window = [board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]];
      score += evaluateWindow(window, aiPlayer);
    }
  }

  return score;
}

// Minimax with Alpha-Beta Pruning & Move Ordering
function minimaxAB(
  board: BoardState,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  aiPlayer: PlayerVal
): { score: number; col?: number } {
  const winInfo = checkWinner(board);
  if (winInfo?.winner === aiPlayer) return { score: 1000000 + depth };
  if (winInfo?.winner && winInfo.winner !== aiPlayer) return { score: -1000000 - depth };
  if (isBoardFull(board) || depth === 0) {
    return { score: scoreBoard(board, aiPlayer) };
  }

  const validCols = getValidColumns(board);
  // Center move ordering: 3, 2, 4, 1, 5, 0, 6
  const moveOrder = [3, 2, 4, 1, 5, 0, 6];
  const orderedCols = moveOrder.filter((c) => validCols.includes(c));

  if (isMaximizing) {
    let maxScore = -Infinity;
    let bestCol = orderedCols[0];

    for (const col of orderedCols) {
      const row = getLowestEmptyRow(board, col);
      board[row][col] = aiPlayer;
      const res = minimaxAB(board, depth - 1, alpha, beta, false, aiPlayer);
      board[row][col] = EMPTY;

      if (res.score > maxScore) {
        maxScore = res.score;
        bestCol = col;
      }
      alpha = Math.max(alpha, maxScore);
      if (alpha >= beta) break; // Alpha-Beta Cutoff
    }
    return { score: maxScore, col: bestCol };
  } else {
    let minScore = Infinity;
    let bestCol = orderedCols[0];
    const huPlayer = aiPlayer === 1 ? 2 : 1;

    for (const col of orderedCols) {
      const row = getLowestEmptyRow(board, col);
      board[row][col] = huPlayer;
      const res = minimaxAB(board, depth - 1, alpha, beta, true, aiPlayer);
      board[row][col] = EMPTY;

      if (res.score < minScore) {
        minScore = res.score;
        bestCol = col;
      }
      beta = Math.min(beta, minScore);
      if (alpha >= beta) break; // Alpha-Beta Cutoff
    }
    return { score: minScore, col: bestCol };
  }
}

// Compute AI Move based on chosen difficulty level
function computeAIMove(board: BoardState, difficulty: AIDifficulty, aiPlayer: PlayerVal): number {
  const validCols = getValidColumns(board);
  if (validCols.length === 0) return 0;

  const huPlayer = aiPlayer === 1 ? 2 : 1;

  // 1. Easy Mode: 70% random, 30% check instant win/block
  if (difficulty === 'easy') {
    if (Math.random() < 0.7) {
      return validCols[Math.floor(Math.random() * validCols.length)];
    }
  }

  // 2. Check for immediate winning move for AI
  for (const c of validCols) {
    const r = getLowestEmptyRow(board, c);
    board[r][c] = aiPlayer;
    if (checkWinner(board)?.winner === aiPlayer) {
      board[r][c] = EMPTY;
      return c;
    }
    board[r][c] = EMPTY;
  }

  // 3. Check for immediate blocking move against player
  for (const c of validCols) {
    const r = getLowestEmptyRow(board, c);
    board[r][c] = huPlayer;
    if (checkWinner(board)?.winner === huPlayer) {
      board[r][c] = EMPTY;
      return c;
    }
    board[r][c] = EMPTY;
  }

  // 4. Medium Mode: Depth 3 Minimax
  if (difficulty === 'medium') {
    const res = minimaxAB(board, 3, -Infinity, Infinity, true, aiPlayer);
    return res.col !== undefined ? res.col : validCols[0];
  }

  // 5. Hard Mode: Depth 5 Minimax with Alpha-Beta Pruning
  const res = minimaxAB(board, 5, -Infinity, Infinity, true, aiPlayer);
  return res.col !== undefined ? res.col : validCols[0];
}

export const ConnectFour: React.FC<ConnectFourProps> = ({
  settings,
  mode,
  onFinish,
  onBack,
}) => {
  const commonT = getTranslations(settings.language);
  const t = commonT.games['connect-four'] || getTranslations('en').games['connect-four'];
  const isRtl = settings.language === 'ar';

  // Game State
  const [board, setBoard] = useState<BoardState>(() =>
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(EMPTY))
  );
  const [turn, setTurn] = useState<PlayerVal>(1); // Player 1 starts
  const [winnerInfo, setWinnerInfo] = useState<{
    winner: PlayerVal | 'draw' | null;
    cells: [number, number][];
  }>({ winner: null, cells: [] });
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>('medium');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  // Score tracking
  const [p1Wins, setP1Wins] = useState(0);
  const [p2Wins, setP2Wins] = useState(0);
  const [roundCount, setRoundCount] = useState(1);

  // Player Names
  const p1Name = settings.player1Name || commonT.player1Default;
  const p2Name =
    mode === 'ai'
      ? commonT.computerName
      : settings.player2Name || commonT.player2Default;

  // Start fresh game round
  const resetGame = useCallback(() => {
    soundManager.playClick();
    setBoard(
      Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill(EMPTY))
    );
    setTurn(1);
    setWinnerInfo({ winner: null, cells: [] });
    setIsAiThinking(false);
    setShowResultModal(false);
  }, []);

  // Drop disc into column
  const dropDisc = useCallback(
    (col: number, player: PlayerVal, isAiMove = false) => {
      if (winnerInfo.winner) return false;
      if (!isAiMove && isAiThinking) return false; // Prevent user input while AI is thinking

      const row = getLowestEmptyRow(board, col);
      if (row === -1) return false; // Column is full

      soundManager.playTone(550 - row * 45, 0.12, 'sine');

      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = player;
      setBoard(newBoard);

      const win = checkWinner(newBoard);
      if (win) {
        setWinnerInfo({ winner: win.winner, cells: win.cells });
        if (win.winner === 1) setP1Wins((prev) => prev + 1);
        else setP2Wins((prev) => prev + 1);

        if (mode === 'ai' && win.winner === 2) {
          soundManager.playLose();
        } else {
          soundManager.playWin();
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore confetti fallback
          }
        }

        // Give players time to inspect the 4 winning balls before showing modal
        setTimeout(() => {
          setShowResultModal(true);
        }, 2200);

        return true;
      }

      if (isBoardFull(newBoard)) {
        setWinnerInfo({ winner: 'draw', cells: [] });
        soundManager.playTone(300, 0.3, 'triangle');
        setTimeout(() => {
          setShowResultModal(true);
        }, 1800);
        return true;
      }

      // Switch turn
      setTurn(player === 1 ? 2 : 1);
      return true;
    },
    [board, winnerInfo.winner, isAiThinking, mode]
  );

  // AI Turn Handler
  useEffect(() => {
    if (mode === 'ai' && turn === 2 && !winnerInfo.winner) {
      setIsAiThinking(true);

      const timer = setTimeout(() => {
        const aiCol = computeAIMove(board, aiDifficulty, 2);
        dropDisc(aiCol, 2, true); // Pass isAiMove = true so it isn't blocked!
        setIsAiThinking(false);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [mode, turn, winnerInfo.winner, board, aiDifficulty, dropDisc]);

  const handleColumnClick = (col: number) => {
    if (mode === 'ai' && turn === 2) return; // Prevent clicking during AI turn
    dropDisc(col, turn);
  };

  const handleNextRound = () => {
    setRoundCount((prev) => prev + 1);
    resetGame();
  };

  const handleFinishMatch = () => {
    const finalWinner =
      p1Wins > p2Wins
        ? 'player1'
        : p2Wins > p1Wins
        ? mode === 'ai'
          ? 'ai'
          : 'player2'
        : 'draw';

    onFinish({
      gameId: 'connect-four',
      mode,
      player1: { playerName: p1Name, score: p1Wins },
      player2: { playerName: p2Name, score: p2Wins },
      winner: finalWinner,
      grade: p1Wins > p2Wins ? commonT.excellent : commonT.good,
    });
  };

  return (
    <div className="min-h-[85vh] max-w-2xl mx-auto w-full p-3 sm:p-6 flex flex-col justify-between bg-gradient-to-br from-amber-200/40 via-orange-200/30 to-pink-200/40 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 rounded-3xl border border-white/30 shadow-2xl backdrop-blur-xl relative select-none">
      {/* Background Decorative Blur Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header Navigation Bar (Circular White Sleek Buttons) */}
      <div className="flex items-center justify-between z-10 mb-3">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200/80 flex items-center justify-center text-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-orange-500/10"
          title={commonT.back}
        >
          {isRtl ? <ArrowRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
        </button>

        <div className="text-center">
          <span className="px-3 py-1 rounded-full bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white text-xs font-black border border-white/20">
            {roundCount > 1 ? `${t.round} ${roundCount}` : t.title}
          </span>
        </div>

        <button
          onClick={resetGame}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200/80 flex items-center justify-center text-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-orange-500/10"
          title={commonT.reset}
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      {/* 2. AI Difficulty Level Selector (Only in AI Mode) */}
      {mode === 'ai' && (
        <div className="z-10 mb-4 max-w-md mx-auto w-full bg-black/10 dark:bg-white/10 p-1.5 rounded-2xl border border-white/20 flex items-center justify-between gap-1">
          <button
            onClick={() => {
              soundManager.playClick();
              setAiDifficulty('easy');
            }}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              aiDifficulty === 'easy'
                ? 'bg-emerald-500 text-white shadow-md scale-100'
                : 'text-slate-800 dark:text-white/70 hover:bg-white/10'
            }`}
          >
            {t.easy}
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setAiDifficulty('medium');
            }}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              aiDifficulty === 'medium'
                ? 'bg-amber-500 text-white shadow-md scale-100'
                : 'text-slate-800 dark:text-white/70 hover:bg-white/10'
            }`}
          >
            {t.medium}
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setAiDifficulty('hard');
            }}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              aiDifficulty === 'hard'
                ? 'bg-rose-600 text-white shadow-md scale-100'
                : 'text-slate-800 dark:text-white/70 hover:bg-white/10'
            }`}
          >
            {t.hard}
          </button>
        </div>
      )}

      {/* 3. Player Score & Turn Cards */}
      <div className="grid grid-cols-2 gap-3 z-10 mb-4 max-w-md mx-auto w-full">
        {/* Player 1 Card */}
        <div
          className={`p-3 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
            turn === 1 && !winnerInfo.winner
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border-white shadow-lg scale-[1.02] ring-4 ring-amber-400/50'
              : 'bg-white/20 dark:bg-slate-900/60 border-white/20 text-slate-900 dark:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 border border-white shadow-md" />
            <div>
              <span className="block text-xs font-black truncate max-w-[90px]">{p1Name}</span>
              <span className="text-[10px] font-bold opacity-80">{t.winsCount}: {p1Wins}</span>
            </div>
          </div>
          {turn === 1 && !winnerInfo.winner && (
            <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping" />
          )}
        </div>

        {/* Player 2 / AI Card */}
        <div
          className={`p-3 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
            turn === 2 && !winnerInfo.winner
              ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white border-white shadow-lg scale-[1.02] ring-4 ring-pink-500/50'
              : 'bg-white/20 dark:bg-slate-900/60 border-white/20 text-slate-900 dark:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-pink-300 border border-white shadow-md flex items-center justify-center text-[10px]">
              {mode === 'ai' ? <Bot className="w-4 h-4 text-white" /> : null}
            </div>
            <div>
              <span className="block text-xs font-black truncate max-w-[90px]">{p2Name}</span>
              <span className="text-[10px] font-bold opacity-80">{t.winsCount}: {p2Wins}</span>
            </div>
          </div>
          {turn === 2 && !winnerInfo.winner && (
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          )}
        </div>
      </div>

      {/* Turn Banner / Status Message with Prominent Ball Indicator */}
      <div className="text-center z-10 mb-3 flex flex-col items-center justify-center">
        {winnerInfo.winner ? (
          <div className="px-4 py-2 rounded-2xl bg-amber-400/20 border border-amber-400/40 shadow-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-300 animate-bounce" />
            <span className="text-sm font-black text-slate-900 dark:text-amber-300">
              {winnerInfo.winner === 1
                ? t.p1Wins
                : winnerInfo.winner === 2
                ? mode === 'ai'
                  ? t.aiWins
                  : t.p2Wins
                : t.draw}
            </span>
          </div>
        ) : isAiThinking ? (
          <div className="px-4 py-2 rounded-2xl bg-pink-500/20 border border-pink-400/30 shadow-lg flex items-center gap-2 animate-pulse">
            <Bot className="w-5 h-5 text-pink-400 animate-spin" />
            <span className="text-xs font-black text-pink-600 dark:text-pink-300">
              {t.aiThinking}
            </span>
          </div>
        ) : (
          <div className="px-4 py-2 rounded-2xl bg-white/30 dark:bg-slate-900/80 border border-white/20 shadow-md flex items-center gap-2.5">
            {/* Always-visible active colored ball indicator */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`w-6 h-6 rounded-full border-2 shadow-lg relative overflow-hidden flex-shrink-0 ${
                turn === 1
                  ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-100 border-amber-200 shadow-amber-400/60'
                  : 'bg-gradient-to-tr from-rose-600 via-pink-500 to-pink-200 border-pink-200 shadow-pink-500/60'
              }`}
            >
              <div className="absolute top-0.5 left-1 w-2 h-2 rounded-full bg-white/60 blur-[0.5px]" />
            </motion.div>

            <span className="text-xs font-black text-slate-900 dark:text-white">
              {turn === 1 ? t.p1Turn : mode === 'ai' ? t.aiTurn : t.p2Turn}
            </span>
          </div>
        )}
      </div>

      {/* 4. The Connect 4 Game Board */}
      <div className="relative z-10 max-w-md mx-auto w-full">
        {/* Column Drop Controls with Always-Visible Colored Balls */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5 px-3 sm:px-5 mb-2">
          {Array.from({ length: COLS }).map((_, c) => {
            const isFull = getLowestEmptyRow(board, c) === -1;
            const isHovered = hoverCol === c;

            return (
              <button
                key={`col-btn-${c}`}
                disabled={isFull || (mode === 'ai' && turn === 2) || !!winnerInfo.winner}
                onClick={() => handleColumnClick(c)}
                onMouseEnter={() => setHoverCol(c)}
                onMouseLeave={() => setHoverCol(null)}
                className={`py-2 px-1 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group ${
                  isFull
                    ? 'opacity-30 bg-slate-800/40 border-slate-700/40 cursor-not-allowed'
                    : isHovered
                    ? 'bg-white/40 dark:bg-white/20 border-white/60 scale-105 shadow-xl'
                    : 'bg-white/15 dark:bg-slate-900/40 border-white/20 hover:bg-white/25'
                }`}
                title={`Drop in column ${c + 1}`}
              >
                {/* Always-Visible Ball Preview on Top */}
                <motion.div
                  animate={isHovered ? { y: [0, 3, 0], scale: 1.1 } : { y: 0, scale: 1 }}
                  transition={{ repeat: isHovered ? Infinity : 0, duration: 0.6 }}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 shadow-md relative overflow-hidden transition-all ${
                    turn === 1
                      ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-100 border-amber-200 shadow-amber-400/50'
                      : 'bg-gradient-to-tr from-rose-600 via-pink-500 to-pink-200 border-pink-200 shadow-pink-500/50'
                  }`}
                >
                  <div className="absolute top-0.5 left-1 w-2 h-2 rounded-full bg-white/60 blur-[0.5px]" />
                </motion.div>

                {/* Drop Arrow Indicator */}
                <span className={`text-[10px] font-black transition-transform ${isHovered ? 'translate-y-0.5 text-amber-300' : 'text-white/60'}`}>
                  ▼
                </span>
              </button>
            );
          })}
        </div>

        {/* Board Container */}
        <div className="bg-slate-950 border-4 border-slate-800 rounded-3xl p-3 sm:p-5 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
          {/* Grid of 6 rows x 7 cols */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3 relative">
            {board.map((row, rIdx) =>
              row.map((cellVal, cIdx) => {
                const isWinningCell = winnerInfo.cells.some(
                  ([wR, wC]) => wR === rIdx && wC === cIdx
                );
                const hasWinner = winnerInfo.winner !== null;
                const isDimmed = hasWinner && !isWinningCell;
                const lowestEmpty = getLowestEmptyRow(board, cIdx);
                const isGhostSpot =
                  hoverCol === cIdx &&
                  lowestEmpty === rIdx &&
                  cellVal === EMPTY &&
                  !winnerInfo.winner &&
                  !isAiThinking;

                return (
                  <div
                    key={`slot-${rIdx}-${cIdx}`}
                    onClick={() => handleColumnClick(cIdx)}
                    onMouseEnter={() => setHoverCol(cIdx)}
                    onMouseLeave={() => setHoverCol(null)}
                    className="aspect-square rounded-full bg-slate-900/90 shadow-inner border border-slate-800 flex items-center justify-center relative cursor-pointer group hover:bg-slate-800/60 transition-colors"
                  >
                    {/* Ghost Ball Preview at target landing spot */}
                    {isGhostSpot && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.55, scale: 0.95 }}
                        className={`w-full h-full rounded-full border-2 border-dashed relative overflow-hidden ${
                          turn === 1
                            ? 'bg-amber-400/40 border-amber-300'
                            : 'bg-pink-500/40 border-pink-300'
                        }`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-black">
                          ↓
                        </div>
                      </motion.div>
                    )}

                    <AnimatePresence>
                      {cellVal !== EMPTY && (
                        <motion.div
                          key={`disc-${rIdx}-${cIdx}`}
                          initial={{ y: -300, scale: 0.7, opacity: 0 }}
                          animate={{
                            y: 0,
                            scale: isWinningCell ? 1.12 : isDimmed ? 0.9 : 1,
                            opacity: isDimmed ? 0.45 : 1,
                          }}
                          transition={{
                            type: 'spring',
                            damping: 15,
                            stiffness: 220,
                            mass: 0.75,
                          }}
                          className={`w-full h-full rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
                            cellVal === 1
                              ? 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-100 border-2 border-amber-200 shadow-lg shadow-amber-400/50 text-slate-950'
                              : 'bg-gradient-to-tr from-rose-600 via-pink-500 to-pink-200 border-2 border-pink-200 shadow-lg shadow-pink-500/50 text-white'
                          } ${
                            isWinningCell
                              ? 'ring-4 ring-yellow-300 animate-bounce z-30 shadow-[0_0_25px_rgba(250,204,21,1)]'
                              : ''
                          }`}
                        >
                          {/* Glossy 3D radial glare highlight */}
                          <div className="absolute top-1 left-1.5 w-1/3 h-1/3 rounded-full bg-white/60 blur-[0.8px]" />

                          {isWinningCell && (
                            <div className="relative z-10 flex items-center justify-center p-1 rounded-full bg-yellow-400/40 border border-yellow-200 shadow-inner">
                              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-100 animate-spin drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Floating Victory Bar when inspecting board */}
      {winnerInfo.winner && !showResultModal && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-20 mt-3 p-3 rounded-2xl bg-slate-900/90 dark:bg-slate-950/90 border border-amber-400/40 shadow-2xl flex flex-wrap items-center justify-between gap-2 max-w-md mx-auto w-full backdrop-blur-md"
        >
          <div className="flex items-center gap-2 text-amber-300 font-black text-xs">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>الكرات الأربعة الفائزة مضاءة على اللوحة!</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setShowResultModal(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>إظهار النتيجة</span>
            </button>

            <button
              onClick={handleNextRound}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{commonT.playAgain}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* 5. Game Finish / Winner Modal Overlay */}
      <AnimatePresence>
        {winnerInfo.winner && showResultModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-full max-w-sm bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border border-white/20 rounded-3xl p-6 text-white shadow-2xl text-center overflow-hidden relative"
            >
              <div className="p-4 rounded-full bg-amber-400/20 text-amber-300 w-16 h-16 mx-auto mb-3 flex items-center justify-center border border-amber-400/40 shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-black bg-gradient-to-r from-amber-300 via-white to-pink-300 bg-clip-text text-transparent mb-1">
                {winnerInfo.winner === 1
                  ? t.p1Wins
                  : winnerInfo.winner === 2
                  ? mode === 'ai'
                    ? t.aiWins
                    : t.p2Wins
                  : t.draw}
              </h2>

              <p className="text-xs text-white/70 mb-5 font-medium">
                {p1Name}: {p1Wins} | {p2Name}: {p2Wins}
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setShowResultModal(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>مشاهدة اللوحة (الكرات الأربعة)</span>
                </button>

                <button
                  onClick={handleNextRound}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-950 font-black text-base shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>{commonT.playAgain}</span>
                </button>

                <button
                  onClick={handleFinishMatch}
                  className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>{commonT.mainMenu}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-center gap-3 z-10 mt-3">
        <button
          onClick={handleFinishMatch}
          className="px-5 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 dark:bg-slate-900/60 dark:hover:bg-slate-900/90 border border-white/20 text-slate-900 dark:text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>{commonT.mainMenu}</span>
        </button>
      </div>
    </div>
  );
};
