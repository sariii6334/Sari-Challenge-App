import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Gamepad2 } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    soundManager.playSuccess();
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 p-6 text-white overflow-hidden select-none">
      {/* Background Decorative Animated Rings */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-96 h-96 rounded-full bg-white/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 h-72 rounded-full bg-yellow-300/30 blur-2xl pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
        className="relative flex flex-col items-center text-center z-10"
      >
        <div className="w-28 h-28 mb-6 rounded-3xl bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl flex items-center justify-center text-white ring-4 ring-white/30">
          <Gamepad2 className="w-16 h-16 animate-pulse" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-wider drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 via-white to-pink-100"
        >
          Sari Challenge
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 px-6 py-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/30 shadow-lg flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="text-xl md:text-2xl font-bold tracking-wide text-yellow-200">
            Created by Sari
          </span>
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
        </motion.div>
      </motion.div>

      {/* Bottom Loading Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 flex items-center gap-2"
      >
        <span className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-3 h-3 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
      </motion.div>
    </div>
  );
};
