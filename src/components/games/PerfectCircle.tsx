import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { CircleDot, Eye, RotateCcw, Check } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface PerfectCircleProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

export const PerfectCircle: React.FC<PerfectCircleProps> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['perfect-circle'] || getTranslations('en').games['perfect-circle'];

  const [phase, setPhase] = useState<'preview' | 'drawing'>('preview');
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [p1Score, setP1Score] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (phase === 'preview') {
      const timer = setTimeout(() => {
        setPhase('drawing');
        soundManager.playSuccess();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phase !== 'drawing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    soundManager.playTick();
    setIsDrawing(true);
    setPoints([{ x, y }]);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPts = [...points, { x, y }];
    setPoints(newPts);
    drawCircleCanvas(newPts);
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const drawCircleCanvas = (pts: { x: number; y: number }[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (pts.length > 1) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = '#ec4899'; // Pink
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 12;
      ctx.stroke();
    }
  };

  const evaluateCircleScore = (): number => {
    if (points.length < 10) return 0;

    const N = points.length;
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < N; i++) {
      sumX += points[i].x;
      sumY += points[i].y;
    }
    const centerX = sumX / N;
    const centerY = sumY / N;

    let sumR = 0;
    const radii: number[] = [];
    for (let i = 0; i < N; i++) {
      const dx = points[i].x - centerX;
      const dy = points[i].y - centerY;
      const r = Math.sqrt(dx * dx + dy * dy);
      radii.push(r);
      sumR += r;
    }
    const avgR = sumR / N;

    if (avgR < 20) return 0; // Too small

    let sumVariance = 0;
    for (let i = 0; i < N; i++) {
      sumVariance += Math.pow(radii[i] - avgR, 2);
    }
    const stdDevR = Math.sqrt(sumVariance / N);

    const firstPt = points[0];
    const lastPt = points[N - 1];
    const gap = Math.sqrt(
      Math.pow(lastPt.x - firstPt.x, 2) + Math.pow(lastPt.y - firstPt.y, 2)
    );

    const variancePenalty = (stdDevR / avgR) * 220;
    const gapPenalty = (gap / avgR) * 60;

    const score = Math.max(0, Math.min(100, Math.round(100 - variancePenalty - gapPenalty)));
    return score;
  };

  const handleClear = () => {
    soundManager.playClick();
    setPoints([]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSubmit = () => {
    const score = evaluateCircleScore();
    if (score === 0) return;

    soundManager.playClick();

    if (mode === 'friend' && activePlayer === 1) {
      setP1Score(score);
      setActivePlayer(2);
      handleClear();
      setPhase('preview');
    } else if (mode === 'friend' && activePlayer === 2) {
      const s1 = p1Score || 0;
      const s2 = score;

      let winner: 'player1' | 'player2' | 'draw' = 'draw';
      if (s1 > s2) winner = 'player1';
      else if (s2 > s1) winner = 'player2';

      onFinish({
        gameId: 'perfect-circle',
        mode: 'friend',
        player1: {
          playerName: settings.player1Name,
          score: `${s1}%`,
          secondaryMetric: 'نسبة استدارة',
        },
        player2: {
          playerName: settings.player2Name,
          score: `${s2}%`,
          secondaryMetric: 'نسبة استدارة',
        },
        winner,
      });
    } else {
      // Solo Mode
      let grade = t.tryAgain;
      if (score >= 90) grade = t.excellent;
      else if (score >= 80) grade = t.veryGood;
      else if (score >= 65) grade = t.good;

      onFinish({
        gameId: 'perfect-circle',
        mode: 'solo',
        player1: {
          playerName: settings.player1Name,
          score: `${score}%`,
          secondaryMetric: 'دقة استدارة الدائرة',
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
      {/* Header */}
      <div className="w-full max-w-md bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleDot className="w-6 h-6 text-pink-400" />
          <h2 className="text-xl font-black">{gTrans.title}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-pink-400 text-slate-950 text-xs font-black">
          {currentPlayerName}
        </span>
      </div>

      {/* Main Canvas Stage */}
      <div className="my-auto w-full max-w-md flex flex-col items-center">
        {phase === 'preview' ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full p-6 rounded-3xl bg-slate-900/90 border-2 border-pink-400/50 shadow-2xl flex flex-col items-center"
          >
            <div className="flex items-center gap-2 text-pink-300 mb-4 font-bold text-sm">
              <Eye className="w-5 h-5 animate-bounce" />
              <span>{gTrans.refCircleMsg}</span>
            </div>

            {/* Glowing Guide Circle */}
            <div className="w-full h-52 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-center p-4">
              <div className="w-36 h-36 rounded-full border-4 border-dashed border-pink-400 animate-spin shadow-[0_0_20px_#ec4899]" style={{ animationDuration: '20s' }} />
            </div>

            <p className="text-xs text-white/70 mt-4">
              ارسم دائرة كاملة بلمسة واحدة متصلة!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full p-4 rounded-3xl bg-slate-900/90 border-2 border-pink-400/50 shadow-2xl flex flex-col items-center"
          >
            <p className="text-xs font-bold text-pink-300 mb-3">
              {gTrans.drawCircleNow}
            </p>

            <canvas
              ref={canvasRef}
              width={340}
              height={260}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full bg-slate-950 rounded-2xl border-2 border-pink-400/30 touch-none cursor-crosshair shadow-inner"
            />

            <div className="flex items-center justify-between w-full mt-4 gap-3">
              <button
                onClick={handleClear}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-xs text-white/80 flex items-center gap-1 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>مسح</span>
              </button>

              <button
                disabled={points.length < 10}
                onClick={handleSubmit}
                className={`flex-1 py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all border ${
                  points.length < 10
                    ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 border-yellow-300 text-white hover:scale-105 active:scale-95 cursor-pointer'
                }`}
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>تقييم الدائرة</span>
              </button>
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
