import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gamepad2, Trophy, Flame, Star, Zap } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface SplashScreenProps {
  onFinish: () => void;
}

// Bubbly background particle interface
interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [phase, setPhase] = useState<'welcome' | 'loading'>('welcome');
  const [progress, setProgress] = useState<number>(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Generate random colorful floating bubbles
  useEffect(() => {
    const bubbleColors = [
      'from-cyan-400/50 to-blue-500/50',
      'from-pink-400/50 to-rose-500/50',
      'from-purple-400/50 to-indigo-500/50',
      'from-amber-300/50 to-yellow-500/50',
      'from-emerald-300/50 to-teal-400/50',
      'from-fuchsia-400/50 to-pink-600/50',
    ];

    const generatedBubbles: Bubble[] = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 60) + 25, // 25px - 85px
      left: Math.random() * 95, // 0 - 95%
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 4, // 4s - 8s
      color: bubbleColors[i % bubbleColors.length],
    }));

    setBubbles(generatedBubbles);
  }, []);

  // Phase 1 timer -> Phase 2 (~1.5s)
  useEffect(() => {
    soundManager.playSuccess();
    const welcomeTimer = setTimeout(() => {
      setPhase('loading');
    }, 1500);

    return () => clearTimeout(welcomeTimer);
  }, []);

  // Phase 2 progress bar (~3 seconds)
  useEffect(() => {
    if (phase !== 'loading') return;

    const startTime = Date.now();
    const duration = 2900; // ~3 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onFinish();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [phase, onFinish]);

  const loadingTextMap = (pct: number) => {
    if (pct < 30) return 'Preparing 15 Mini Games... 🫧';
    if (pct < 65) return 'Loading Sound Effects & Levels... 🎵';
    if (pct < 90) return 'Setting Up High Scores... 🏆';
    return 'Ready to Play! 🚀';
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 p-6 text-white overflow-hidden select-none font-sans">
      {/* Glossy Bubbly Background Gradient Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [-30, 30, -30],
          y: [-20, 20, -20],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-600 opacity-40 blur-2xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [30, -30, 30],
          y: [20, -20, 20],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-tr from-fuchsia-500 via-pink-500 to-amber-400 opacity-40 blur-2xl pointer-events-none"
      />

      {/* Floating Animated Rising Soap Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', opacity: 0, scale: 0.6 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.6, 1.1, 0.9, 1.2],
              x: ['0px', `${(b.id % 2 === 0 ? 1 : -1) * 35}px`, '0px'],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              delay: b.delay,
              ease: 'easeInOut',
            }}
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
            }}
            className={`absolute rounded-full bg-gradient-to-tr ${b.color} backdrop-blur-sm border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center`}
          >
            {/* Glossy Bubble Highlight Reflection */}
            <div className="absolute top-1.5 left-2 w-1/3 h-1/3 rounded-full bg-white/70 blur-[1px]" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: WELCOME SCREEN (BUBBLY) */}
        {phase === 'welcome' && (
          <motion.div
            key="phase-welcome"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, y: -30 }}
            transition={{ type: 'spring', stiffness: 180, damping: 15 }}
            className="relative z-10 flex flex-col items-center text-center max-w-sm w-full"
          >
            {/* Top Created By Sari Bubbly Badge */}
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 px-6 py-2 rounded-full bg-white/10 border-2 border-white/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-2 text-amber-300 font-black text-sm tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '2.5s' }} />
              <span className="drop-shadow">Created by Sari</span>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '2.5s' }} />
            </motion.div>

            {/* Glowing 3D Bubble Icon */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 4, -4, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-32 h-32 mb-6 rounded-[38px] bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-1.5 shadow-[0_0_40px_rgba(236,72,153,0.5)] border-2 border-white/50"
            >
              {/* Gloss Inner Bubble */}
              <div className="w-full h-full rounded-[32px] bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-yellow-300 relative overflow-hidden">
                <div className="absolute top-2 left-3 w-8 h-8 rounded-full bg-white/40 blur-[2px]" />
                <Gamepad2 className="w-16 h-16 animate-bounce text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              </div>
            </motion.div>

            {/* WELCOME! Bubbly Title */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 12 }}
              className="px-8 py-3 rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border-2 border-white/30 backdrop-blur-xl shadow-2xl"
            >
              <h1 className="text-5xl md:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-200 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                Welcome! 👋
              </h1>
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 2: SARI CHALLENGE + 15 MINI GAMES (BUBBLY) */}
        {phase === 'loading' && (
          <motion.div
            key="phase-loading"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 170, damping: 16 }}
            className="relative z-10 flex flex-col items-center text-center max-w-md w-full px-4"
          >
            {/* Top Created By Sari Bubble Chip */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-5 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-amber-300 text-xs font-black tracking-widest uppercase flex items-center gap-2 shadow-lg"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
              <span>Created by Sari</span>
            </motion.div>

            {/* Bubbly Game Trophy Sphere */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mb-4"
            >
              <div className="w-28 h-28 rounded-[36px] bg-gradient-to-tr from-amber-400 via-pink-500 to-cyan-400 p-1.5 shadow-[0_0_35px_rgba(251,191,36,0.6)] ring-4 ring-white/20">
                <div className="w-full h-full rounded-[28px] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center gap-1 text-white relative overflow-hidden">
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/30 blur-[1px]" />
                  <Trophy className="w-12 h-12 text-amber-300 animate-pulse drop-shadow-[0_0_10px_rgba(252,211,77,0.8)]" />
                  <span className="text-[10px] font-black tracking-widest text-pink-300 uppercase">
                    PRO
                  </span>
                </div>
              </div>

              {/* Floating Mini Stars */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-3 -right-3"
              >
                <Star className="w-7 h-7 text-yellow-300 fill-yellow-300 drop-shadow-md" />
              </motion.div>
            </motion.div>

            {/* Main App Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] mb-3"
            >
              Sari Challenge
            </motion.h1>

            {/* 15 Mini Games Bubbly Pill Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-8 px-7 py-3 rounded-3xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-500/30 border-2 border-white/40 shadow-[0_10px_30px_rgba(236,72,153,0.3)] backdrop-blur-xl flex items-center justify-center gap-3"
            >
              <Flame className="w-6 h-6 text-amber-300 animate-bounce" />
              <span className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">
                15 Mini Games
              </span>
              <Flame className="w-6 h-6 text-amber-300 animate-bounce" />
            </motion.div>

            {/* Bubbly Progress Bar (~3 seconds) */}
            <div className="w-full max-w-xs space-y-3">
              {/* Status & Percent */}
              <div className="flex items-center justify-between text-xs font-extrabold px-1 text-cyan-200">
                <span className="drop-shadow">{loadingTextMap(progress)}</span>
                <span className="text-yellow-300 text-sm font-black tracking-wider drop-shadow">
                  {progress}%
                </span>
              </div>

              {/* Glossy Bubbly Tube Track */}
              <div className="relative w-full h-5 rounded-full bg-slate-950/80 border-2 border-white/30 p-1 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] backdrop-blur-md">
                {/* Active Bubbly Progress Bar */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 shadow-[0_0_15px_rgba(236,72,153,0.8)] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                >
                  {/* Gloss Tube Highlight */}
                  <div className="absolute top-0.5 inset-x-0 h-1/2 rounded-t-full bg-white/40" />
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

