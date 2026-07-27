import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tv, Play, CheckCircle2, X, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface AdModalProps {
  isOpen: boolean;
  title?: string;
  rewardDescription?: string;
  onReward: () => void;
  onClose: () => void;
  language?: string;
}

export const AdModal: React.FC<AdModalProps> = ({
  isOpen,
  title = 'مشاهدة إعلان مكافأة',
  rewardDescription = 'شاهد إعلانًا قصيرًا للحصول على فرصة إضافية وإعادة سماع التسلسل!',
  onReward,
  onClose,
  language = 'ar',
}) => {
  const [countdown, setCountdown] = useState<number>(5);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsCompleted(false);
      return;
    }

    setCountdown(5);
    setIsCompleted(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          soundManager.playSuccess();
          return 0;
        }
        if (!isMuted) {
          soundManager.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isMuted]);

  if (!isOpen) return null;

  const isAr = language === 'ar';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(245,158,11,0.2)] text-white text-center overflow-hidden"
        >
          {/* Ad Sponsor Badge */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-amber-400 font-bold">
            <span className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              <Tv className="w-3.5 h-3.5" />
              {isAr ? 'إعلان مموّل (AdMob)' : 'Sponsored Ad'}
            </span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
          </div>

          {/* Ad Content / Animation */}
          <div className="relative my-4 p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-purple-600/20 to-cyan-500/20 border border-amber-400/30 flex flex-col items-center justify-center overflow-hidden min-h-[160px]">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-amber-500/5 animate-pulse" />

            {!isCompleted ? (
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-amber-400/30 border-t-amber-400 animate-spin" />
                  <span className="absolute text-xl font-black text-amber-400">{countdown}</span>
                </div>
                <p className="text-xs font-semibold text-slate-300 max-w-[220px]">
                  {isAr ? 'جاري عرض الإعلان... يرجى الانتظار للحصول على المكافأة' : 'Ad is playing... Please wait to claim reward'}
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-black text-emerald-400">
                  {isAr ? 'تم كسب المكافأة بنجاح!' : 'Reward Earned!'}
                </h4>
                <p className="text-xs text-slate-300">
                  {rewardDescription}
                </p>
              </motion.div>
            )}
          </div>

          {/* Ad Info */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'إعلان آمن وسريع من شبكة الألعاب' : 'Safe & fast game network ad'}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            {isCompleted ? (
              <button
                onClick={() => {
                  onReward();
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm hover:brightness-110 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                {isAr ? 'استلام المكافأة وإعادة التسلسل' : 'Claim Reward & Replay'}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-400 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
                {isAr ? 'إلغاء الإعلان (بدون مكافأة)' : 'Cancel (No Reward)'}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
