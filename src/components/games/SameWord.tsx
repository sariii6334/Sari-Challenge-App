import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home as HomeIcon,
  RotateCcw,
  Trophy,
  Sparkles,
  Play,
  Smartphone,
  Eye,
  EyeOff,
  Send,
  History,
  Bot,
  Users,
  HelpCircle,
  CheckCircle2,
  Share2,
  Lightbulb,
  ArrowRight,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface SameWordProps {
  settings: AppSettings;
  mode: GameMode;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

export interface WordPairHistory {
  round: number;
  p1Word: string;
  p2Word: string;
  matched: boolean;
}

// Helper to normalize Arabic strings for case/diacritic-insensitive matching
export function normalizeArabicWord(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0670]/g, '') // Harakat
    .replace(/[أإآ]/g, 'ا') // Alef
    .replace(/ى/g, 'ي') // Alef Maqsura
    .replace(/ة/g, 'ه') // Taa Marbuta
    .replace(/[^\w\s\u0600-\u06FF]/gi, '') // Special chars
    .replace(/\s+/g, ' ');
}

// Smart AI word generator for AI mode (fallback dictionary & semantic category matcher)
const AI_BRIDGE_DICTIONARY: Record<string, string[]> = {
  طعام: ['فواكه', 'خضار', 'سلطة', 'وجبة', 'مطبخ', 'مطعم', 'لذيذ', 'صحن'],
  تفاحة: ['فاكهة', 'طعام', 'أحمر', 'شجرة', 'شجر', 'عصير', 'حلو'],
  خيارة: ['خضار', 'سلطة', 'طعام', 'أخضر', 'مطبخ', 'نبات'],
  سلطة: ['طعام', 'خضار', 'صحي', 'مطبخ', 'زيتون', 'غداء'],
  حيوان: ['طبيعة', 'غابة', 'قطة', 'كلب', 'أسد', 'أليف'],
  سيارة: ['مركبة', 'سفر', 'طريق', 'عجلات', 'سرعة', 'سائق'],
  ماء: ['شراب', 'بحر', 'نهر', 'سائل', 'شرب', 'حياة', 'عطش'],
  كتاب: ['قراءة', 'مكتبة', 'علم', 'دراسة', 'ورق', 'قلم'],
  شمس: ['نهار', 'ضوء', 'حرارة', 'صيف', 'سماء', 'صفراء'],
  قمر: ['ليل', 'نجوم', 'سماء', 'ضوء', 'فضاء', 'جمال'],
};

function getAIWord(w1: string, w2: string): string {
  const norm1 = normalizeArabicWord(w1);
  const norm2 = normalizeArabicWord(w2);

  // Check dictionary matches
  if (AI_BRIDGE_DICTIONARY[norm1]) {
    const list = AI_BRIDGE_DICTIONARY[norm1];
    return list[Math.floor(Math.random() * list.length)];
  }
  if (AI_BRIDGE_DICTIONARY[norm2]) {
    const list = AI_BRIDGE_DICTIONARY[norm2];
    return list[Math.floor(Math.random() * list.length)];
  }

  // Common fallbacks
  const fallbackWords = ['طعام', 'طبيعة', 'شيء', 'مكان', 'شعور', 'عالم', 'فكرة', 'حياة', 'بيت'];
  return fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
}

export const SameWord: React.FC<SameWordProps> = ({
  settings,
  mode: initialMode,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['same-word'] || getTranslations('en').games['same-word'];

  // Game setup
  const [activeMode, setActiveMode] = useState<GameMode>(
    initialMode === 'ai' ? 'ai' : 'friend'
  );
  const [gameState, setGameState] = useState<
    'start' | 'pass' | 'turn' | 'round_result' | 'victory'
  >('start');

  // Turn tracking
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [activePlayerTurn, setActivePlayerTurn] = useState<1 | 2>(1);

  // Entered Words
  const [p1WordInput, setP1WordInput] = useState<string>('');
  const [p2WordInput, setP2WordInput] = useState<string>('');
  const [inputWord, setInputWord] = useState<string>('');

  // Target pair for current bridge round
  const [targetPair, setTargetPair] = useState<{ p1: string; p2: string } | null>(null);

  // Round History
  const [history, setHistory] = useState<WordPairHistory[]>([]);

  // UI States
  const [showWordMask, setShowWordMask] = useState<boolean>(true);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Player Names
  const p1Name = settings.player1Name || t.player1Default;
  const p2Name = activeMode === 'ai' ? t.computerName : settings.player2Name || t.player2Default;

  // Reset Game
  const startNewGame = () => {
    setGameState('pass');
    setCurrentRound(1);
    setActivePlayerTurn(1);
    setP1WordInput('');
    setP2WordInput('');
    setInputWord('');
    setTargetPair(null);
    setHistory([]);
    setShowWordMask(true);
    soundManager.playClick();
  };

  // Trigger Victory Confetti
  const triggerVictoryConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
    soundManager.playSuccess();
    soundManager.vibrate(100);
  };

  // Handle Pass Phone Ready Click
  const handleReadyForTurn = () => {
    setGameState('turn');
    setInputWord('');
    setShowWordMask(true);
    soundManager.playClick();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  // Submit Current Player Word
  const handleSubmitWord = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputWord.trim();
    if (!trimmed) return;

    soundManager.playClick();

    if (activePlayerTurn === 1) {
      setP1WordInput(trimmed);

      if (activeMode === 'ai') {
        // AI Turn automatically
        const aiResponse = currentRound === 1
          ? getAIWord('طعام', 'شيء')
          : getAIWord(targetPair?.p1 || '', targetPair?.p2 || '');
        setP2WordInput(aiResponse);

        // Process Round Result directly
        processRoundEvaluation(trimmed, aiResponse);
      } else {
        // Pass phone to Player 2
        setActivePlayerTurn(2);
        setGameState('pass');
      }
    } else {
      // Player 2 submitted
      setP2WordInput(trimmed);
      processRoundEvaluation(p1WordInput, trimmed);
    }
  };

  // Evaluate if words match or proceed to next bridge round
  const processRoundEvaluation = (w1: string, w2: string) => {
    const norm1 = normalizeArabicWord(w1);
    const norm2 = normalizeArabicWord(w2);
    const isMatched = norm1 === norm2 && norm1.length > 0;

    const newRecord: WordPairHistory = {
      round: currentRound,
      p1Word: w1,
      p2Word: w2,
      matched: isMatched,
    };

    setHistory((prev) => [...prev, newRecord]);

    if (isMatched) {
      // VICTORY!
      setGameState('victory');
      triggerVictoryConfetti();
    } else {
      // MISMATCH -> Move to Next Round with current pair as target
      setTargetPair({ p1: w1, p2: w2 });
      setGameState('round_result');
    }
  };

  // Advance to Next Round from Result View
  const handleProceedToNextRound = () => {
    setCurrentRound((prev) => prev + 1);
    setActivePlayerTurn(1);
    setP1WordInput('');
    setP2WordInput('');
    setInputWord('');
    setGameState('pass');
    soundManager.playClick();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white p-3 select-none flex flex-col justify-between relative overflow-hidden dir-rtl">
      {/* Background Decorative Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Bar */}
      <div className="max-w-md mx-auto w-full z-20 flex items-center justify-between gap-2 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-xl">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white cursor-pointer active:scale-90 border border-white/20"
          title="Home"
        >
          <HomeIcon className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 font-extrabold text-xs shadow-inner border border-purple-400/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>{gTrans.title}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={() => {
                soundManager.playClick();
                setShowHistoryModal(true);
              }}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-amber-300 cursor-pointer active:scale-90 border border-white/20 relative"
              title="History"
            >
              <History className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-500 text-white text-[10px] font-black flex items-center justify-center border border-white">
                {history.length}
              </span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playClick();
              setShowHelpModal(true);
            }}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-sky-300 cursor-pointer active:scale-90 border border-white/20"
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          <button
            onClick={startNewGame}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white cursor-pointer active:scale-90 border border-white/20"
            title="Restart"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 1. START SCREEN */}
      {gameState === 'start' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto w-full z-20 my-auto p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-center flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-4xl shadow-2xl border-2 border-white/30 transform -rotate-3">
            🗣️
          </div>

          <div>
            <h1 className="text-3xl font-black text-white mb-2 tracking-wide">
              {gTrans.title}
            </h1>
            <p className="text-xs text-white/80 font-bold max-w-xs mx-auto leading-relaxed">
              {gTrans.desc}
            </p>
          </div>

          {/* Mode Selection */}
          <div className="w-full bg-black/20 p-1.5 rounded-2xl border border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveMode('friend');
              }}
              className={`py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeMode === 'friend'
                  ? 'bg-purple-500 text-white shadow-lg border border-purple-300/40'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.playWithFriend}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveMode('ai');
              }}
              className={`py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeMode === 'ai'
                  ? 'bg-indigo-500 text-white shadow-lg border border-indigo-300/40'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>{t.playVsAI}</span>
            </button>
          </div>

          {/* Rules Card */}
          <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 text-right space-y-2">
            <span className="text-xs font-black text-purple-300 block mb-1">{gTrans.quickHowToPlay}</span>
            <div className="text-[11px] text-white/80 space-y-1.5 font-bold">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500/40 text-purple-200 text-[10px] flex items-center justify-center font-black">1</span>
                <span>{gTrans.step1}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500/40 text-purple-200 text-[10px] flex items-center justify-center font-black">2</span>
                <span>{gTrans.step2}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500/40 text-purple-200 text-[10px] flex items-center justify-center font-black">3</span>
                <span>{gTrans.step3}</span>
              </div>
            </div>
          </div>

          <button
            onClick={startNewGame}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black text-base shadow-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/30"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>{t.startGame}</span>
          </button>
        </motion.div>
      )}

      {/* 2. PASS PHONE SCREEN (Privacy Guard) */}
      {gameState === 'pass' && (
        <motion.div
          key={`pass-${currentRound}-${activePlayerTurn}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto w-full z-20 my-auto p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-center flex flex-col items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-4xl shadow-2xl border-4 border-white/30 animate-pulse">
            <Smartphone className="w-12 h-12 text-slate-950" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-extrabold text-xs mb-2 inline-block border border-amber-400/30">
              {t.round} {currentRound}
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              {t.passDeviceTo} {activePlayerTurn === 1 ? p1Name : p2Name}
            </h2>
            <p className="text-xs text-white/70 font-bold mt-1">
              {gTrans.privacyNotice}
            </p>
          </div>

          {/* Current Target Pair (if Round > 1) */}
          {targetPair && (
            <div className="w-full bg-black/30 rounded-2xl p-4 border border-white/10 text-center">
              <span className="text-xs text-purple-300 font-black block mb-2">
                {gTrans.targetWordsNextRound}
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-purple-500/30 text-white font-black text-sm border border-purple-400/30">
                  {targetPair.p1}
                </span>
                <span className="text-xs text-white/50 font-bold">➕</span>
                <span className="px-3 py-1.5 rounded-xl bg-indigo-500/30 text-white font-black text-sm border border-indigo-400/30">
                  {targetPair.p2}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleReadyForTurn}
            className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base shadow-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border-2 border-white"
          >
            <CheckCircle2 className="w-5 h-5 text-slate-950" />
            <span>{gTrans.readyToStart}</span>
          </button>
        </motion.div>
      )}

      {/* 3. INPUT TURN SCREEN */}
      {gameState === 'turn' && (
        <motion.div
          key={`turn-${currentRound}-${activePlayerTurn}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto w-full z-20 my-auto p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col gap-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-black text-sm border border-white/30">
                {activePlayerTurn === 1 ? 'P1' : 'P2'}
              </div>
              <div>
                <h3 className="font-black text-base text-white">
                  {activePlayerTurn === 1 ? t.player1Turn : t.player2Turn} ({activePlayerTurn === 1 ? p1Name : p2Name})
                </h3>
                <span className="text-[11px] text-white/60 font-bold block">
                  {currentRound === 1 ? gTrans.initialRoundHint : gTrans.bridgeRoundHint.replace('{round}', currentRound.toString())}
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 font-extrabold text-xs border border-white/20">
              {t.round} {currentRound}
            </span>
          </div>

          {/* Current Target Pair Hint (if Round > 1) */}
          {currentRound > 1 && targetPair && (
            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl p-4 border border-white/15 text-center">
              <span className="text-xs text-purple-200 font-bold block mb-2">
                {gTrans.thinkBridgeWord}
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="px-3 py-2 rounded-xl bg-purple-500/40 text-white font-black text-base shadow-md border border-purple-300/40">
                  {targetPair.p1}
                </span>
                <span className="text-sm text-purple-300 font-black">+</span>
                <span className="px-3 py-2 rounded-xl bg-indigo-500/40 text-white font-black text-base shadow-md border border-indigo-300/40">
                  {targetPair.p2}
                </span>
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmitWord} className="flex flex-col gap-4">
            <div className="relative">
              <input
                ref={inputRef}
                type={showWordMask ? 'password' : 'text'}
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder={currentRound === 1 ? gTrans.inputSecretPlaceholder : gTrans.inputBridgePlaceholder}
                className="w-full bg-black/40 border-2 border-white/20 focus:border-amber-300 rounded-2xl px-4 py-4 text-white placeholder-white/40 text-lg font-black text-center outline-none transition-all pr-12 pl-12 shadow-inner"
                autoComplete="off"
                autoFocus
              />

              {/* Mask Toggle */}
              <button
                type="button"
                onClick={() => setShowWordMask(!showWordMask)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-all cursor-pointer"
                title="Toggle Visibility"
              >
                {showWordMask ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!inputWord.trim()}
              className={`w-full py-4 rounded-2xl font-black text-base shadow-xl transition-all flex items-center justify-center gap-2 border-2 ${
                inputWord.trim()
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-white cursor-pointer active:scale-95'
                  : 'bg-white/10 text-white/40 border-white/10 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5 text-slate-950 transform rotate-180" />
              <span>{gTrans.confirmWord}</span>
            </button>
          </form>
        </motion.div>
      )}

      {/* 4. ROUND RESULT / MISMATCH SCREEN */}
      {gameState === 'round_result' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto w-full z-20 my-auto p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-center flex flex-col items-center gap-5"
        >
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 text-3xl shadow-lg">
            🤔
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">{gTrans.mismatchTitle}</h2>
            <p className="text-xs text-white/70 font-bold mt-1">
              {gTrans.mismatchSub}
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="w-full bg-black/30 rounded-2xl p-4 border border-white/10 grid grid-cols-2 gap-3 text-center">
            <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-400/30">
              <span className="text-[11px] text-purple-300 font-bold block mb-1">{p1Name}</span>
              <span className="text-lg font-black text-white block">{p1WordInput}</span>
            </div>

            <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-400/30">
              <span className="text-[11px] text-indigo-300 font-bold block mb-1">{p2Name}</span>
              <span className="text-lg font-black text-white block">{p2WordInput}</span>
            </div>
          </div>

          <div className="w-full bg-amber-400/10 border border-amber-300/20 rounded-xl p-3 text-xs text-amber-200 font-bold flex items-center justify-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-300 flex-shrink-0" />
            <span>{gTrans.mismatchTargetHint.replace('{round}', (currentRound + 1).toString())} ({p1WordInput}) & ({p2WordInput})</span>
          </div>

          <button
            onClick={handleProceedToNextRound}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black text-base shadow-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/30"
          >
            <span>{gTrans.nextRoundBtn.replace('{round}', (currentRound + 1).toString())}</span>
            <ArrowRight className="w-5 h-5 transform rotate-180" />
          </button>
        </motion.div>
      )}

      {/* 5. VICTORY SCREEN */}
      {gameState === 'victory' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto w-full z-20 my-auto p-6 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border-2 border-amber-300/60 shadow-2xl text-center flex flex-col items-center gap-5"
        >
          <div className="w-20 h-20 rounded-full bg-amber-400/20 border-2 border-amber-300 flex items-center justify-center text-amber-300 text-4xl shadow-xl animate-bounce">
            🎉
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs mb-2 inline-block border border-amber-200 shadow-md">
              {gTrans.perfectMatchBadge}
            </span>
            <h2 className="text-3xl font-black text-white">{gTrans.victoryTitle}</h2>
            <p className="text-xs text-white/80 font-bold mt-1">
              {gTrans.victoryMsg} <span className="text-amber-300 font-black">{currentRound}</span> {t.round}!
            </p>
          </div>

          {/* Matched Word Banner */}
          <div className="w-full bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-amber-500/30 border-2 border-amber-300/50 rounded-2xl p-4 text-center shadow-lg">
            <span className="text-xs text-amber-200 font-bold block mb-1">{gTrans.sharedWord}</span>
            <span className="text-3xl font-black text-amber-300 tracking-wider block">{p1WordInput}</span>
          </div>

          {/* Timeline Summary */}
          <div className="w-full bg-white/5 rounded-2xl p-3 border border-white/10 text-right max-h-40 overflow-y-auto space-y-2">
            <span className="text-xs font-black text-purple-300 block mb-1">{gTrans.associationHistory}</span>
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between text-[11px] bg-black/20 p-2 rounded-xl border border-white/5 font-bold">
                <span className="text-amber-300">{t.round} {h.round}:</span>
                <div className="flex items-center gap-2">
                  <span className="text-purple-200">{h.p1Word}</span>
                  <span className="text-white/40">+</span>
                  <span className="text-indigo-200">{h.p2Word}</span>
                </div>
                <span>{h.matched ? '✅' : '❌'}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-2.5 mt-2">
            <button
              onClick={startNewGame}
              className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer border-2 border-white"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.playAgain}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onFinish({
                  gameId: 'same-word' as any,
                  mode: activeMode,
                  player1: {
                    playerName: p1Name,
                    score: currentRound,
                    secondaryMetric: `Rounds: ${currentRound}`,
                  },
                  player2: {
                    playerName: p2Name,
                    score: currentRound,
                  },
                  winner: 'draw',
                  grade: currentRound <= 3 ? t.excellent : t.veryGood,
                });
              }}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer border border-white/20"
            >
              {t.mainMenu}
            </button>
          </div>
        </motion.div>
      )}

      {/* HISTORY MODAL */}
      <AnimatePresence>
        {showHistoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 dir-rtl"
            onClick={() => setShowHistoryModal(false)}
          >
            <div
              className="max-w-md w-full bg-slate-900 border border-white/20 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-amber-300" />
                  <span>{gTrans.historyModalTitle}</span>
                </h3>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between font-bold text-xs"
                  >
                    <span className="w-16 px-2 py-1 rounded-lg bg-purple-500/30 text-purple-300 text-[10px] text-center font-black">
                      {t.round} {item.round}
                    </span>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-purple-200">{item.p1Word}</span>
                      <span className="text-white/40">⚡</span>
                      <span className="text-indigo-200">{item.p2Word}</span>
                    </div>

                    <span className="text-base">{item.matched ? '🎉' : '⏳'}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HELP / GUIDE MODAL */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 dir-rtl"
            onClick={() => setShowHelpModal(false)}
          >
            <div
              className="max-w-md w-full bg-slate-900 border border-white/20 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-right"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-sky-300" />
                  <span>{gTrans.helpModalTitle}</span>
                </h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-white/80 font-bold leading-relaxed">
                <p>
                  🎯 {gTrans.ruleTarget}
                </p>
                <p>
                  {gTrans.rule1}
                </p>
                <p>
                  {gTrans.rule2}
                </p>
                <p>
                  {gTrans.rule3}
                </p>
              </div>

              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-md cursor-pointer"
              >
                {gTrans.rulesUnderstood}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
