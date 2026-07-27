import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Ruler, Eye, RotateCcw, Check } from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface PerfectLineProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

export const PerfectLine: React.FC<PerfectLineProps> = ({
  mode,
  settings,
  onFinish,
  onBack,
}) => {
  const t = getTranslations(settings.language);
  const gTrans = t.games['perfect-line'] || getTranslations('en').games['perfect-line'];

  const [phase, setPhase] = useState<'preview' | 'drawing'>('preview');
  const [refLength, setRefLength] = useState<number>(180); // in pixels
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [p1Length, setP1Length] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Generate random reference length between 120px and 260px
    const randomLength = Math.floor(Math.random() * 140) + 120;
    setRefLength(randomLength);
  }, []);

  // Timer to auto hide reference line after preview
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
    setStartPoint({ x, y });
    setEndPoint({ x, y });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setEndPoint({ x, y });
    drawCanvas({ x, y });
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const drawCanvas = (currentEnd?: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const endP = currentEnd || endPoint;
    if (startPoint && endP) {
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endP.x, endP.y);
      ctx.strokeStyle = '#38bdf8'; // Sky blue
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.stroke();
    }
  };

  const calculateLength = (): number => {
    if (!startPoint || !endPoint) return 0;
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    return Math.round(Math.sqrt(dx * dx + dy * dy));
  };

  const handleClear = () => {
    soundManager.playClick();
    setStartPoint(null);
    setEndPoint(null);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSubmitDraw = () => {
    const drawnLen = calculateLength();
    if (drawnLen === 0) return;

    soundManager.playClick();

    if (mode === 'friend' && activePlayer === 1) {
      setP1Length(drawnLen);
      setActivePlayer(2);
      handleClear();
      setPhase('preview');
    } else if (mode === 'friend' && activePlayer === 2) {
      const p1Len = p1Length || 0;
      const p2Len = drawnLen;

      const diff1 = Math.abs(p1Len - refLength);
      const diff2 = Math.abs(p2Len - refLength);

      let winner: 'player1' | 'player2' | 'draw' = 'draw';
      if (diff1 < diff2) winner = 'player1';
      else if (diff2 < diff1) winner = 'player2';

      onFinish({
        gameId: 'perfect-line',
        mode: 'friend',
        targetOrRef: `${refLength}px`,
        player1: {
          playerName: settings.player1Name,
          score: `${p1Len}px`,
          secondaryMetric: `الفرق: ${diff1}px`,
        },
        player2: {
          playerName: settings.player2Name,
          score: `${p2Len}px`,
          secondaryMetric: `الفرق: ${diff2}px`,
        },
        winner,
      });
    } else {
      // Solo Mode
      const diff = Math.abs(drawnLen - refLength);
      const accuracyPct = Math.max(0, Math.round(100 - (diff / refLength) * 100));

      let grade = t.tryAgain;
      if (accuracyPct >= 95) grade = t.excellent;
      else if (accuracyPct >= 85) grade = t.veryGood;
      else if (accuracyPct >= 70) grade = t.good;

      onFinish({
        gameId: 'perfect-line',
        mode: 'solo',
        targetOrRef: `${refLength}px`,
        player1: {
          playerName: settings.player1Name,
          score: `${accuracyPct}% (${drawnLen}px)`,
          secondaryMetric: `${diff}px فرق`,
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
          <Ruler className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-black">{gTrans.title}</h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-black">
          {currentPlayerName}
        </span>
      </div>

      {/* Canvas Area */}
      <div className="my-auto w-full max-w-md flex flex-col items-center">
        {phase === 'preview' ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full p-6 rounded-3xl bg-slate-900/90 border-2 border-emerald-400/50 shadow-2xl flex flex-col items-center"
          >
            <div className="flex items-center gap-2 text-emerald-300 mb-4 font-bold text-sm">
              <Eye className="w-5 h-5 animate-bounce" />
              <span>{gTrans.refLineMsg}</span>
            </div>

            {/* Glowing Reference Line Display */}
            <div className="w-full h-40 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-center p-4">
              <div
                style={{ width: `${refLength}px` }}
                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 shadow-[0_0_15px_#10b981]"
              />
            </div>

            <p className="text-xs text-white/70 mt-4">
              سيختفي الخط بعد لحظات قصيرة... جهّز أصبعك!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full p-4 rounded-3xl bg-slate-900/90 border-2 border-sky-400/50 shadow-2xl flex flex-col items-center"
          >
            <p className="text-xs font-bold text-sky-300 mb-3">
              {gTrans.drawNow}
            </p>

            <canvas
              ref={canvasRef}
              width={340}
              height={220}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full bg-slate-950 rounded-2xl border-2 border-sky-400/30 touch-none cursor-crosshair shadow-inner"
            />

            <div className="flex items-center justify-between w-full mt-4 gap-3">
              <button
                onClick={handleClear}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 font-bold text-xs text-white/80 flex items-center gap-1 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{gTrans.clearCanvas}</span>
              </button>

              <button
                disabled={calculateLength() === 0}
                onClick={handleSubmitDraw}
                className={`flex-1 py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all border ${
                  calculateLength() === 0
                    ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 border-yellow-300 text-slate-950 hover:scale-105 active:scale-95 cursor-pointer'
                }`}
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>إرسال الرسم</span>
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
