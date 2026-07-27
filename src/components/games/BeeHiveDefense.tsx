import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Trophy,
  RefreshCw,
  HelpCircle,
  Play,
  Heart,
  Award,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { getTranslations } from '../../i18n/translations';
import { AppSettings, GameMode, GameResult } from '../../types';
import { soundManager } from '../../utils/sound';

interface BeeHiveDefenseProps {
  mode: GameMode;
  settings: AppSettings;
  onFinish: (result: GameResult) => void;
  onBack: () => void;
}

type BeeType = 'normal' | 'speedy' | 'fat' | 'queen' | 'zigzag' | 'golden';

interface Bee {
  id: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
  vx: number;
  vy: number;
  speed: number;
  radius: number;
  hp: number;
  maxHp: number;
  type: BeeType;
  color: string;
  points: number;
  damage: number;
  angle: number;
  wingAngle: number;
  wiggleOffset: number;
  timeAlive: number;
  hitFlash: number;
}

interface HoneyDrop {
  id: number;
  x: number;
  y: number;
  radius: number;
  spawnTime: number;
  lifetime: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface TextPopup {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  alpha: number;
  scale: number;
}

const STORAGE_KEY = 'bee_hive_defense_best_score';
const STORAGE_SEEN_INTROS_KEY = 'bee_hive_defense_seen_intros';

const WAVE_INTRODUCTIONS: Record<number, BeeType> = {
  4: 'speedy',
  6: 'zigzag',
  7: 'fat',
  8: 'golden',
  9: 'queen',
};

const BEE_INTRO_THEMES: Record<string, {
  cardGradient: string;
  borderColor: string;
  glowShadow: string;
  badgeStyle: string;
  titleColor: string;
  btnStyle: string;
}> = {
  speedy: {
    cardGradient: 'from-slate-900 via-sky-950 to-slate-900',
    borderColor: 'border-sky-500/60',
    glowShadow: 'shadow-sky-500/30',
    badgeStyle: 'bg-sky-500/20 border-sky-400/50 text-sky-300',
    titleColor: 'text-sky-400',
    btnStyle: 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/40',
  },
  fat: {
    cardGradient: 'from-slate-900 via-orange-950 to-slate-900',
    borderColor: 'border-orange-500/60',
    glowShadow: 'shadow-orange-500/30',
    badgeStyle: 'bg-orange-500/20 border-orange-400/50 text-orange-300',
    titleColor: 'text-orange-400',
    btnStyle: 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white shadow-orange-500/40',
  },
  zigzag: {
    cardGradient: 'from-slate-900 via-emerald-950 to-slate-900',
    borderColor: 'border-emerald-500/60',
    glowShadow: 'shadow-emerald-500/30',
    badgeStyle: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300',
    titleColor: 'text-emerald-400',
    btnStyle: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/40',
  },
  queen: {
    cardGradient: 'from-slate-900 via-amber-950 to-slate-900',
    borderColor: 'border-amber-400/80',
    glowShadow: 'shadow-amber-500/40',
    badgeStyle: 'bg-amber-500/20 border-amber-300/60 text-amber-200',
    titleColor: 'text-amber-300',
    btnStyle: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black shadow-amber-500/40',
  },
  golden: {
    cardGradient: 'from-slate-900 via-yellow-950 to-slate-900',
    borderColor: 'border-yellow-300/80',
    glowShadow: 'shadow-yellow-400/40',
    badgeStyle: 'bg-yellow-400/20 border-yellow-300/60 text-yellow-200',
    titleColor: 'text-yellow-300',
    btnStyle: 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black shadow-yellow-400/40',
  },
};

const BeePreviewCanvas: React.FC<{ beeType: BeeType }> = ({ beeType }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let wingAngle = 0;

    let color = '#fbbf24';
    let radius = 32;
    if (beeType === 'speedy') {
      color = '#38bdf8';
      radius = 28;
    } else if (beeType === 'fat') {
      color = '#ea580c';
      radius = 38;
    } else if (beeType === 'queen') {
      color = '#f59e0b';
      radius = 42;
    } else if (beeType === 'zigzag') {
      color = '#22c55e';
      radius = 30;
    } else if (beeType === 'golden') {
      color = '#eab308';
      radius = 34;
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      wingAngle += 0.25;

      ctx.save();
      ctx.translate(cx, cy);

      // Aura / Glow Effect
      if (beeType === 'speedy') {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.beginPath();
        ctx.arc(-radius, 0, radius * 0.9, 0, Math.PI * 2);
        ctx.fill();
      } else if (beeType === 'golden') {
        ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, radius + 12, 0, Math.PI * 2);
        ctx.fill();
      } else if (beeType === 'queen') {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
        ctx.beginPath();
        ctx.arc(0, 0, radius + 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // Wings Fluttering
      const wingYOffset = Math.sin(wingAngle) * 7;
      ctx.fillStyle = beeType === 'speedy' ? 'rgba(186, 230, 253, 0.9)' : 'rgba(255, 255, 255, 0.9)';

      // Top Wing
      ctx.beginPath();
      ctx.ellipse(0, -radius * 0.8 + wingYOffset, radius * 0.65, radius * 0.95, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Bottom Wing
      ctx.beginPath();
      ctx.ellipse(0, radius * 0.8 - wingYOffset, radius * 0.65, radius * 0.95, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      // Bee Body
      ctx.fillStyle = color;
      ctx.beginPath();
      if (beeType === 'fat') {
        ctx.ellipse(0, 0, radius * 1.1, radius, 0, 0, Math.PI * 2);
      } else if (beeType === 'zigzag') {
        ctx.ellipse(0, 0, radius * 1.2, radius * 0.7, 0, 0, Math.PI * 2);
      } else {
        ctx.ellipse(0, 0, radius * 1.1, radius * 0.85, 0, 0, Math.PI * 2);
      }
      ctx.fill();

      // Dark Stripes
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-radius * 0.3, -radius * 0.8, radius * 0.35, radius * 1.6);
      ctx.fillRect(radius * 0.2, -radius * 0.75, radius * 0.3, radius * 1.5);

      // Head & Eyes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(radius * 0.85, 0, radius * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // White Eye Dots
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(radius * 0.95, -radius * 0.18, radius * 0.15, 0, Math.PI * 2);
      ctx.arc(radius * 0.95, radius * 0.18, radius * 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Rear Stinger
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.moveTo(-radius * 1.1, -radius * 0.2);
      ctx.lineTo(-radius * 1.5, 0);
      ctx.lineTo(-radius * 1.1, radius * 0.2);
      ctx.closePath();
      ctx.fill();

      // Overlays
      if (beeType === 'fat') {
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(-radius * 0.2, -radius * 0.3, 16, 5);
        ctx.fillRect(-radius * 0.1, -radius * 0.4, 5, 16);
      }

      if (beeType === 'queen') {
        ctx.fillStyle = '#facc15';
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const headX = radius * 0.85;
        ctx.moveTo(headX - 8, -radius * 0.8);
        ctx.lineTo(headX - 14, -radius * 1.3);
        ctx.lineTo(headX - 3, -radius * 1.0);
        ctx.lineTo(headX + 5, -radius * 1.4);
        ctx.lineTo(headX + 11, -radius * 1.0);
        ctx.lineTo(headX + 16, -radius * 1.3);
        ctx.lineTo(headX + 11, -radius * 0.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(headX - 14, -radius * 1.3, 3, 0, Math.PI * 2);
        ctx.arc(headX + 5, -radius * 1.4, 3, 0, Math.PI * 2);
        ctx.arc(headX + 16, -radius * 1.3, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [beeType]);

  return <canvas ref={canvasRef} width={200} height={150} className="mx-auto block shrink-0" />;
};

export const BeeHiveDefense: React.FC<BeeHiveDefenseProps> = ({
  settings,
  onFinish,
  onBack,
}) => {
  const translations = getTranslations(settings.language);
  const t = translations.games['bee-hive-defense'] || getTranslations('en').games['bee-hive-defense'];

  // Game state
  const [gameState, setGameState] = useState<'start' | 'playing' | 'game_over'>('start');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [hiveHealth, setHiveHealth] = useState(100);
  const [wave, setWave] = useState(1);
  const [beesSquished, setBeesSquished] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [waveBanner, setWaveBanner] = useState<string | null>(null);

  // New Enemy Introduction & Countdown state
  const [seenBeeIntros, setSeenBeeIntros] = useState<Set<BeeType>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SEEN_INTROS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return new Set(parsed as BeeType[]);
      }
    } catch (e) {
      console.error('Error loading seen bee intros:', e);
    }
    return new Set<BeeType>();
  });

  const [introBeeType, setIntroBeeType] = useState<BeeType | null>(null);
  const [countdownStep, setCountdownStep] = useState<string | null>(null);

  const seenBeeIntrosRef = useRef(seenBeeIntros);
  useEffect(() => {
    seenBeeIntrosRef.current = seenBeeIntros;
  }, [seenBeeIntros]);

  // Ready Countdown Flow
  const startReadyCountdown = useCallback(
    (onComplete: () => void) => {
      setCountdownStep(t.ready || 'READY');
      soundManager.playTone(520, 0.12, 'sine');

      setTimeout(() => {
        setCountdownStep('3');
        soundManager.playTone(600, 0.1, 'sine');

        setTimeout(() => {
          setCountdownStep('2');
          soundManager.playTone(680, 0.1, 'sine');

          setTimeout(() => {
            setCountdownStep('1');
            soundManager.playTone(760, 0.1, 'sine');

            setTimeout(() => {
              setCountdownStep(t.go || 'GO!');
              soundManager.playTone(950, 0.2, 'sine');

              setTimeout(() => {
                setCountdownStep(null);
                onComplete();
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    },
    [t]
  );

  // Handle Continue button click on introduction card
  const handleContinueFromIntro = useCallback(() => {
    if (!introBeeType) return;
    soundManager.playClick();

    const currentBee = introBeeType;
    setSeenBeeIntros((prev) => {
      const next = new Set(prev);
      next.add(currentBee);
      try {
        localStorage.setItem(
          STORAGE_SEEN_INTROS_KEY,
          JSON.stringify(Array.from(next))
        );
      } catch (e) {
        console.error('Failed to save seen bee intros', e);
      }
      return next;
    });

    setIntroBeeType(null);

    // Start Ready Countdown before wave spawning resumes
    startReadyCountdown(() => {
      const game = gameRef.current;
      game.lastSpawnTime = performance.now();
      game.isWaveTransitioning = false;
    });
  }, [introBeeType, startReadyCountdown]);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Mutable game ref for high-performance RAF loop
  const gameRef = useRef<{
    isLoopRunning: boolean;
    score: number;
    health: number;
    wave: number;
    beesSquished: number;
    bees: Bee[];
    honeyDrops: HoneyDrop[];
    particles: Particle[];
    popups: TextPopup[];
    lastSpawnTime: number;
    beesSpawnedInWave: number;
    isWaveTransitioning: boolean;
    shakeTime: number;
    hiveHitFlash: number;
    nextBeeId: number;
    nextDropId: number;
    nextPopupId: number;
    lastHoneyDropMilestone: number;
  }>({
    isLoopRunning: false,
    score: 0,
    health: 100,
    wave: 1,
    beesSquished: 0,
    bees: [],
    honeyDrops: [],
    particles: [],
    popups: [],
    lastSpawnTime: 0,
    beesSpawnedInWave: 0,
    isWaveTransitioning: false,
    shakeTime: 0,
    hiveHitFlash: 0,
    nextBeeId: 1,
    nextDropId: 1,
    nextPopupId: 1,
    lastHoneyDropMilestone: 0,
  });

  // Calculate wave total bee quota
  const getWaveTotalBees = (currentWave: number): number => {
    if (currentWave <= 4) return 8;
    if (currentWave === 5) return 9;
    if (currentWave === 6) return 10;
    if (currentWave === 7) return 10;
    if (currentWave === 8) return 11;
    if (currentWave === 9) return 12;
    return 12 + (currentWave - 9);
  };

  // Calculate spawn interval based on wave
  const getSpawnInterval = (currentWave: number): number => {
    if (currentWave === 1) return 1100;
    if (currentWave === 2) return 1050;
    if (currentWave === 3) return 980;
    if (currentWave === 4) return 920;
    if (currentWave === 5) return 880;
    if (currentWave === 6) return 780;
    if (currentWave === 7) return 750;
    if (currentWave === 8) return 700;
    if (currentWave === 9) return 650;
    return Math.max(380, 650 - (currentWave - 9) * 20);
  };

  // Calculate speed multiplier based on wave
  const getBeeSpeedMultiplier = (currentWave: number): number => {
    if (currentWave === 1) return 1.0;
    if (currentWave === 2) return 1.02;
    if (currentWave === 3) return 1.12;
    if (currentWave === 4) return 1.15;
    if (currentWave === 5) return 1.18;
    if (currentWave === 6) return 1.25;
    if (currentWave === 7) return 1.28;
    if (currentWave === 8) return 1.32;
    if (currentWave === 9) return 1.35;
    return Math.min(2.2, 1.35 + (currentWave - 9) * 0.03);
  };

  // Select bee type based on wave progression rules
  const getBeeTypeForWave = (currentWave: number): BeeType => {
    if (currentWave < 4) {
      // Waves 1, 2, 3: 100% normal yellow bees
      return 'normal';
    } else if (currentWave === 4) {
      // Wave 4: 25% blue fast bee
      return Math.random() < 0.25 ? 'speedy' : 'normal';
    } else if (currentWave === 5) {
      // Wave 5: 35% blue fast bee
      return Math.random() < 0.35 ? 'speedy' : 'normal';
    } else if (currentWave === 6) {
      // Wave 6: Introduce Zigzag bee (25% zigzag, 30% blue, 45% normal)
      const r = Math.random();
      if (r < 0.25) return 'zigzag';
      if (r < 0.55) return 'speedy';
      return 'normal';
    } else if (currentWave === 7) {
      // Wave 7: Introduce Fat bee (20% fat, 25% zigzag, 30% blue, 25% normal)
      const r = Math.random();
      if (r < 0.20) return 'fat';
      if (r < 0.45) return 'zigzag';
      if (r < 0.75) return 'speedy';
      return 'normal';
    } else if (currentWave === 8) {
      // Wave 8: Introduce Golden bee opportunity (15% golden, 20% fat, 25% blue, 25% zigzag, 15% normal)
      const r = Math.random();
      if (r < 0.15) return 'golden';
      if (r < 0.35) return 'fat';
      if (r < 0.60) return 'speedy';
      if (r < 0.85) return 'zigzag';
      return 'normal';
    } else if (currentWave === 9) {
      // Wave 9: Introduce Queen bee opportunity (10% queen, 10% golden, 25% fat, 25% blue, 20% zigzag, 10% normal)
      const r = Math.random();
      if (r < 0.10) return 'queen';
      if (r < 0.20) return 'golden';
      if (r < 0.45) return 'fat';
      if (r < 0.70) return 'speedy';
      if (r < 0.90) return 'zigzag';
      return 'normal';
    } else {
      // Wave 10+: Balanced mix of all 6 types
      const r = Math.random();
      if (r < 0.10) return 'queen';
      if (r < 0.20) return 'golden';
      if (r < 0.45) return 'fat';
      if (r < 0.70) return 'speedy';
      if (r < 0.88) return 'zigzag';
      return 'normal';
    }
  };

  // Start fresh game session
  const startGame = useCallback(() => {
    soundManager.playClick();
    soundManager.playTone(520, 0.15, 'sine');

    gameRef.current = {
      isLoopRunning: true,
      score: 0,
      health: 100,
      wave: 1,
      beesSquished: 0,
      bees: [],
      honeyDrops: [],
      particles: [],
      popups: [],
      lastSpawnTime: 0, // Set to 0 so time - lastSpawnTime >= interval triggers on frame 1
      beesSpawnedInWave: 0,
      isWaveTransitioning: false,
      shakeTime: 0,
      hiveHitFlash: 0,
      nextBeeId: 1,
      nextDropId: 1,
      nextPopupId: 1,
      lastHoneyDropMilestone: 0,
    };

    setScore(0);
    setHiveHealth(100);
    setWave(1);
    setBeesSquished(0);
    setIsNewRecord(false);
    setGameState('playing');
    setWaveBanner(`🐝 ${t.wave} 1`);
    setTimeout(() => setWaveBanner(null), 1500);
  }, [t]);

  // Spawn single bee
  const spawnSingleBee = (
    width: number,
    height: number,
    currentWave: number,
    edge: number
  ) => {
    const g = gameRef.current;
    const speedMult = getBeeSpeedMultiplier(currentWave);

    const hiveX = width / 2;
    const hiveY = height / 2;
    const margin = 35;

    let startX = 0;
    let startY = 0;

    if (edge === 0) {
      startX = Math.random() * width;
      startY = -margin;
    } else if (edge === 1) {
      startX = width + margin;
      startY = Math.random() * height;
    } else if (edge === 2) {
      startX = Math.random() * width;
      startY = height + margin;
    } else {
      startX = -margin;
      startY = Math.random() * height;
    }

    const type = getBeeTypeForWave(currentWave);
    let baseSpeed = 2.8;
    let radius = 18;
    let hp = 1;
    let points = 10;
    let damage = 10;
    let color = '#fbbf24'; // Yellow

    if (type === 'speedy') {
      // Blue Bee
      baseSpeed = 4.2;
      radius = 14;
      hp = 1;
      points = 15;
      damage = 10;
      color = '#38bdf8'; // Electric blue
    } else if (type === 'fat') {
      // Fat Bee (2 taps)
      baseSpeed = 1.9;
      radius = 25;
      hp = 2;
      points = 20;
      damage = 18;
      color = '#ea580c'; // Deep orange
    } else if (type === 'queen') {
      // Queen Bee (5 taps)
      baseSpeed = 2.1;
      radius = 28;
      hp = 5;
      points = 100;
      damage = 25;
      color = '#f59e0b'; // Radiant gold
    } else if (type === 'zigzag') {
      // Zigzag Bee (slim green)
      baseSpeed = 2.8;
      radius = 16;
      hp = 1;
      points = 15;
      damage = 12;
      color = '#22c55e'; // Lime green
    } else if (type === 'golden') {
      // Golden Bee (restores 10% health!)
      baseSpeed = 2.8;
      radius = 18;
      hp = 1;
      points = 10;
      damage = 10;
      color = '#eab308'; // Metallic gold
    }

    const dx = hiveX - startX;
    const dy = hiveY - startY;
    const dist = Math.hypot(dx, dy) || 1;
    const speed = baseSpeed * speedMult;

    const vx = (dx / dist) * speed;
    const vy = (dy / dist) * speed;
    const angle = Math.atan2(dy, dx);

    const newBee: Bee = {
      id: g.nextBeeId++,
      x: startX,
      y: startY,
      startX,
      startY,
      vx,
      vy,
      speed,
      radius,
      hp,
      maxHp: hp,
      type,
      color,
      points,
      damage,
      angle,
      wingAngle: 0,
      wiggleOffset: Math.random() * 100,
      timeAlive: 0,
      hitFlash: 0,
    };

    g.bees.push(newBee);
  };

  // Spawn bees for wave considering batching/simultaneous directions
  const spawnBeesForWave = useCallback((width: number, height: number, currentWave: number) => {
    const g = gameRef.current;
    if (width <= 0 || height <= 0) return;

    const totalWaveBees = getWaveTotalBees(currentWave);
    const remainingToSpawn = totalWaveBees - g.beesSpawnedInWave;

    if (remainingToSpawn <= 0) return;

    // Batching logic for simultaneous directions
    let batchCount = 1;
    if (currentWave === 2 || currentWave === 3) {
      if (remainingToSpawn >= 2 && Math.random() < 0.35) {
        batchCount = 2;
      }
    } else if (currentWave >= 4) {
      if (remainingToSpawn >= 2 && Math.random() < 0.45) {
        batchCount = 2;
      }
    }

    const edgesToUse: number[] = [];
    for (let b = 0; b < batchCount; b++) {
      let edge = Math.floor(Math.random() * 4);
      if (b > 0 && edgesToUse.includes(edge)) {
        edge = (edge + 1 + Math.floor(Math.random() * 3)) % 4;
      }
      edgesToUse.push(edge);
      spawnSingleBee(width, height, currentWave, edge);
    }

    g.beesSpawnedInWave += batchCount;
  }, []);

  // Spawn Honey Drop item when score milestone reached
  const checkHoneyDropSpawn = (width: number, height: number) => {
    const g = gameRef.current;
    if (width <= 0 || height <= 0) return;

    const milestone = Math.floor(g.score / 1500);

    if (milestone > g.lastHoneyDropMilestone && g.health < 100) {
      g.lastHoneyDropMilestone = milestone;

      // Safe position away from edges and center hive
      const margin = 70;
      const x = margin + Math.random() * Math.max(10, width - margin * 2);
      const y = margin + Math.random() * Math.max(10, height - margin * 2);

      g.honeyDrops.push({
        id: g.nextDropId++,
        x,
        y,
        radius: 22,
        spawnTime: performance.now(),
        lifetime: 6000,
      });

      soundManager.playTone(880, 0.1, 'sine');
    }
  };

  // Spawn particle burst
  const createSquishParticles = (x: number, y: number, color: string, count: number = 14) => {
    const g = gameRef.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.8;
      g.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        radius: 2 + Math.random() * 4,
        alpha: 1,
        life: 0,
        maxLife: 20 + Math.random() * 15,
      });
    }
  };

  // Add floating text popup (+10, etc.)
  const addTextPopup = (x: number, y: number, text: string, color: string = '#fde047') => {
    const g = gameRef.current;
    g.popups.push({
      id: g.nextPopupId++,
      x,
      y,
      text,
      color,
      alpha: 1,
      scale: 1.25,
    });
  };

  // Handle player tap/click on canvas
  const handleCanvasPointer = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== 'playing') return;

    const rect = canvas.getBoundingClientRect();
    const touchX = clientX - rect.left;
    const touchY = clientY - rect.top;

    const g = gameRef.current;

    // 1. Check Honey Drops first
    for (let i = g.honeyDrops.length - 1; i >= 0; i--) {
      const drop = g.honeyDrops[i];
      const dist = Math.hypot(touchX - drop.x, touchY - drop.y);
      if (dist <= drop.radius + 22) {
        // Collect honey drop!
        g.honeyDrops.splice(i, 1);
        const healAmt = 10;
        g.health = Math.min(100, g.health + healAmt);
        setHiveHealth(g.health);

        soundManager.playTone(900, 0.12, 'sine');
        setTimeout(() => soundManager.playTone(1200, 0.15, 'sine'), 80);

        createSquishParticles(drop.x, drop.y, '#fef08a', 20);
        addTextPopup(drop.x, drop.y - 15, '+10 HP 🍯', '#fef08a');
        return;
      }
    }

    // 2. Check Bees
    for (let i = g.bees.length - 1; i >= 0; i--) {
      const bee = g.bees[i];
      const dist = Math.hypot(touchX - bee.x, touchY - bee.y);
      const hitRadius = bee.radius + 22; // Generous mobile tap target

      if (dist <= hitRadius) {
        bee.hp -= 1;
        bee.hitFlash = 10;

        if (bee.hp <= 0) {
          // Bee defeated!
          g.bees.splice(i, 1);
          g.beesSquished += 1;
          g.score += bee.points;
          setScore(g.score);

          // Golden Bee restores 10% hive health!
          if (bee.type === 'golden') {
            const healAmt = 10;
            g.health = Math.min(100, g.health + healAmt);
            setHiveHealth(g.health);
            addTextPopup(bee.x, bee.y - 15, `+${bee.points} | +10 HP ❤️`, '#fef08a');
            soundManager.playTone(950, 0.15, 'sine');
          } else {
            addTextPopup(bee.x, bee.y - 10, `+${bee.points}`, bee.color);
            soundManager.playTone(720 + Math.random() * 300, 0.08, 'sine');
          }

          createSquishParticles(bee.x, bee.y, bee.color, 16);
          setBeesSquished(g.beesSquished);
          checkHoneyDropSpawn(canvas.width, canvas.height);
        } else {
          // Non-lethal hit (Fat Bee or Queen Bee)
          soundManager.playTone(380, 0.08, 'triangle');
          createSquishParticles(bee.x, bee.y, bee.color, 6);
          addTextPopup(bee.x, bee.y - 10, 'HIT!', '#ffffff');
        }
        return;
      }
    }
  }, [gameState]);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleCanvasPointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleCanvasPointer(e.clientX, e.clientY);
  };

  // Game over handler
  const handleGameOver = useCallback(() => {
    const g = gameRef.current;
    g.isLoopRunning = false;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    soundManager.playLose();
    setGameState('game_over');
    setScore(g.score);
    setWave(g.wave);
    setBeesSquished(g.beesSquished);

    const finalScore = g.score;
    let newBest = false;

    if (finalScore > bestScore) {
      newBest = true;
      setBestScore(finalScore);
      setIsNewRecord(true);
      try {
        localStorage.setItem(STORAGE_KEY, finalScore.toString());
      } catch {
        // LocalStorage fallback
      }
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    onFinish({
      gameId: 'bee-hive-defense',
      mode: 'solo',
      player1: {
        playerName: settings.player1Name,
        score: finalScore,
        secondaryMetric: `${t.waveReached}: ${g.wave} (${t.beesSquished}: ${g.beesSquished})`,
      },
      winner: 'player1',
      grade: newBest ? `🏆 ${t.bestScore}!` : `${finalScore}`,
    });
  }, [bestScore, onFinish, settings.player1Name]);

  // Main Canvas Animation Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (time: number) => {
      const g = gameRef.current;
      if (!g.isLoopRunning) return;

      // Dynamically fit canvas size to parent container
      if (canvas.parentElement) {
        const pWidth = canvas.parentElement.clientWidth;
        const pHeight = canvas.parentElement.clientHeight;
        if (pWidth > 0 && pHeight > 0 && (canvas.width !== pWidth || canvas.height !== pHeight)) {
          canvas.width = pWidth;
          canvas.height = pHeight;
        }
      }

      const width = canvas.width;
      const height = canvas.height;

      // If dimensions are not ready yet, keep loop active and retry next frame
      if (width <= 0 || height <= 0) {
        animationFrameId.current = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      try {
        const hiveX = width / 2;
        const hiveY = height / 2;
        const hiveRadius = 42;

        // Clear Canvas
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Background Grid / Atmosphere
        const maxDim = Math.max(width, height, 100);
        const bgGradient = ctx.createRadialGradient(
          hiveX,
          hiveY,
          Math.min(20, maxDim * 0.05),
          hiveX,
          hiveY,
          maxDim
        );
        bgGradient.addColorStop(0, '#1e1b4b');
        bgGradient.addColorStop(0.6, '#0f172a');
        bgGradient.addColorStop(1, '#020617');

        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);

        // Subtle Honeycomb Grid Lines
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.05)';
        ctx.lineWidth = 1;
        const hexSize = 35;
        for (let x = 0; x < width + hexSize; x += hexSize * 1.5) {
          for (let y = 0; y < height + hexSize; y += hexSize * Math.sqrt(3)) {
            ctx.beginPath();
            ctx.arc(x, y, hexSize * 0.5, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Screen Shake translation
        ctx.save();
        if (g.shakeTime > 0) {
          g.shakeTime -= dt;
          const shakeX = (Math.random() - 0.5) * 12;
          const shakeY = (Math.random() - 0.5) * 12;
          ctx.translate(shakeX, shakeY);
        }

        // 2. Draw Center Hive
        const hiveGlow = ctx.createRadialGradient(
          hiveX,
          hiveY,
          Math.max(1, hiveRadius * 0.2),
          hiveX,
          hiveY,
          hiveRadius + 30
        );
        if (g.hiveHitFlash > 0) {
          g.hiveHitFlash -= dt;
          hiveGlow.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
          hiveGlow.addColorStop(1, 'rgba(239, 68, 68, 0)');
        } else {
          hiveGlow.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
          hiveGlow.addColorStop(1, 'rgba(251, 191, 36, 0)');
        }
        ctx.fillStyle = hiveGlow;
        ctx.beginPath();
        ctx.arc(hiveX, hiveY, hiveRadius + 30, 0, Math.PI * 2);
        ctx.fill();

        // Golden Honeycomb Hive Body
        ctx.fillStyle = g.hiveHitFlash > 0 ? '#ef4444' : '#f59e0b';
        ctx.beginPath();
        ctx.arc(hiveX, hiveY, hiveRadius, 0, Math.PI * 2);
        ctx.fill();

        // Hive Outer Ring
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(hiveX, hiveY, hiveRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Hive Inner Entrance
        ctx.fillStyle = '#451a03';
        ctx.beginPath();
        ctx.arc(hiveX, hiveY, hiveRadius * 0.42, 0, Math.PI * 2);
        ctx.fill();

        // Entrance Glow Ring
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(hiveX, hiveY, hiveRadius * 0.42, 0, Math.PI * 2);
        ctx.stroke();

        // 3. Update & Draw Honey Drops
        for (let i = g.honeyDrops.length - 1; i >= 0; i--) {
          const drop = g.honeyDrops[i];
          const age = time - drop.spawnTime;
          if (age >= drop.lifetime) {
            g.honeyDrops.splice(i, 1);
            continue;
          }

          const remainingPct = 1 - age / drop.lifetime;

          // Glowing Pulse Halo
          const haloRadius = drop.radius + Math.sin(time * 0.008) * 4;
          ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();

          // Expiring countdown ring border
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, drop.radius + 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remainingPct);
          ctx.stroke();

          // Teardrop shape
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(drop.x, drop.y + 2, drop.radius * 0.7, 0, Math.PI);
          ctx.lineTo(drop.x, drop.y - drop.radius);
          ctx.closePath();
          ctx.fill();

          // Shiny Highlight
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(drop.x - 4, drop.y - 2, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // 4. Update & Draw Bees
        for (let i = g.bees.length - 1; i >= 0; i--) {
          const bee = g.bees[i];
          bee.timeAlive += dt;

          // Base Trajectory vector toward central hive
          const dx = hiveX - bee.x;
          const dy = hiveY - bee.y;
          const distToHive = Math.hypot(dx, dy);

          // Check Hive Collision (Damage)
          if (distToHive <= hiveRadius + bee.radius - 5) {
            g.bees.splice(i, 1);
            g.health = Math.max(0, g.health - bee.damage);
            setHiveHealth(g.health);

            g.shakeTime = 0.3;
            g.hiveHitFlash = 0.25;
            soundManager.playTone(180, 0.15, 'sawtooth');

            createSquishParticles(hiveX, hiveY, '#ef4444', 18);
            addTextPopup(hiveX, hiveY - 20, `-${bee.damage} HP`, '#ef4444');

            if (g.health <= 0) {
              handleGameOver();
              return;
            }
            continue;
          }

          // Position Updates
          bee.angle = Math.atan2(dy, dx);
          bee.wingAngle += 0.4;

          if (bee.type === 'zigzag') {
            // Zigzag sine motion perpendicular to path
            const normalVx = dx / distToHive;
            const normalVy = dy / distToHive;
            const perpVx = -normalVy;
            const perpVy = normalVx;
            const sineOffset = Math.sin(bee.timeAlive * 7) * 2.8;

            bee.x += normalVx * bee.speed + perpVx * sineOffset;
            bee.y += normalVy * bee.speed + perpVy * sineOffset;
          } else {
            // Straight movement
            bee.x += (dx / distToHive) * bee.speed;
            bee.y += (dy / distToHive) * bee.speed;
          }

          // Render Bee
          ctx.save();
          ctx.translate(bee.x, bee.y);
          ctx.rotate(bee.angle);

          // Special Trail / Aura Effects
          if (bee.type === 'speedy') {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
            ctx.beginPath();
            ctx.arc(-bee.radius, 0, bee.radius * 0.8, 0, Math.PI * 2);
            ctx.fill();
          } else if (bee.type === 'golden') {
            ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
            ctx.beginPath();
            ctx.arc(0, 0, bee.radius + 6, 0, Math.PI * 2);
            ctx.fill();
          } else if (bee.type === 'queen') {
            ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
            ctx.beginPath();
            ctx.arc(0, 0, bee.radius + 8, 0, Math.PI * 2);
            ctx.fill();
          }

          // Wings Flutter
          const wingYOffset = Math.sin(bee.wingAngle) * 5;
          ctx.fillStyle = bee.type === 'speedy' ? 'rgba(186, 230, 253, 0.85)' : 'rgba(255, 255, 255, 0.85)';

          // Top Wing
          ctx.beginPath();
          ctx.ellipse(0, -bee.radius * 0.8 + wingYOffset, bee.radius * 0.6, bee.radius * 0.9, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();

          // Bottom Wing
          ctx.beginPath();
          ctx.ellipse(0, bee.radius * 0.8 - wingYOffset, bee.radius * 0.6, bee.radius * 0.9, -Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();

          // Bee Body
          ctx.fillStyle = bee.hitFlash > 0 ? '#ffffff' : bee.color;
          if (bee.hitFlash > 0) bee.hitFlash -= 1;

          ctx.beginPath();
          if (bee.type === 'fat') {
            // Chubby round body
            ctx.ellipse(0, 0, bee.radius * 1.1, bee.radius, 0, 0, Math.PI * 2);
          } else if (bee.type === 'zigzag') {
            // Slim body
            ctx.ellipse(0, 0, bee.radius * 1.2, bee.radius * 0.7, 0, 0, Math.PI * 2);
          } else {
            // Standard oval body
            ctx.ellipse(0, 0, bee.radius * 1.1, bee.radius * 0.85, 0, 0, Math.PI * 2);
          }
          ctx.fill();

          // Dark Stripes
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(-bee.radius * 0.3, -bee.radius * 0.8, bee.radius * 0.35, bee.radius * 1.6);
          ctx.fillRect(bee.radius * 0.2, -bee.radius * 0.75, bee.radius * 0.3, bee.radius * 1.5);

          // Head & Eyes
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(bee.radius * 0.85, 0, bee.radius * 0.45, 0, Math.PI * 2);
          ctx.fill();

          // White Eye Dots
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(bee.radius * 0.95, -bee.radius * 0.18, bee.radius * 0.15, 0, Math.PI * 2);
          ctx.arc(bee.radius * 0.95, bee.radius * 0.18, bee.radius * 0.15, 0, Math.PI * 2);
          ctx.fill();

          // Rear Stinger
          ctx.fillStyle = '#020617';
          ctx.beginPath();
          ctx.moveTo(-bee.radius * 1.1, -bee.radius * 0.2);
          ctx.lineTo(-bee.radius * 1.5, 0);
          ctx.lineTo(-bee.radius * 1.1, bee.radius * 0.2);
          ctx.closePath();
          ctx.fill();

          // --- SPECIAL VISUAL OVERLAYS ---

          // Fat Bee (HP = 1): Show clear crack lines & bandage bruise reaction!
          if (bee.type === 'fat' && bee.hp === 1) {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-bee.radius * 0.5, -bee.radius * 0.6);
            ctx.lineTo(0, 0);
            ctx.lineTo(-bee.radius * 0.3, bee.radius * 0.6);
            ctx.stroke();

            // Bandage Cross
            ctx.fillStyle = '#fef08a';
            ctx.fillRect(-bee.radius * 0.2, -bee.radius * 0.3, 12, 4);
            ctx.fillRect(-bee.radius * 0.1, -bee.radius * 0.4, 4, 12);
          }

          // Queen Bee: Golden Crown on head
          if (bee.type === 'queen') {
            // Golden Crown
            ctx.fillStyle = '#facc15';
            ctx.strokeStyle = '#b45309';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            const headX = bee.radius * 0.85;
            ctx.moveTo(headX - 6, -bee.radius * 0.8);
            ctx.lineTo(headX - 10, -bee.radius * 1.3);
            ctx.lineTo(headX - 2, -bee.radius * 1.0);
            ctx.lineTo(headX + 4, -bee.radius * 1.4);
            ctx.lineTo(headX + 8, -bee.radius * 1.0);
            ctx.lineTo(headX + 12, -bee.radius * 1.3);
            ctx.lineTo(headX + 8, -bee.radius * 0.8);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Ruby Jewels on Crown Tips
            ctx.fillStyle = '#dc2626';
            ctx.beginPath();
            ctx.arc(headX - 10, -bee.radius * 1.3, 2, 0, Math.PI * 2);
            ctx.arc(headX + 4, -bee.radius * 1.4, 2, 0, Math.PI * 2);
            ctx.arc(headX + 12, -bee.radius * 1.3, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();

          // Queen HP Indicator Dots above
          if (bee.type === 'queen') {
            for (let h = 0; h < bee.maxHp; h++) {
              const dotX = bee.x - (bee.maxHp * 6) / 2 + h * 7;
              const dotY = bee.y - bee.radius - 12;
              ctx.fillStyle = h < bee.hp ? '#ef4444' : 'rgba(255,255,255,0.3)';
              ctx.beginPath();
              ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Restore Screen Shake matrix
        ctx.restore();

        // 5. Update & Draw Particles
        for (let i = g.particles.length - 1; i >= 0; i--) {
          const p = g.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life += 1;
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;

          if (p.life >= p.maxLife) {
            g.particles.splice(i, 1);
          }
        }

        // 6. Update & Draw Text Popups
        for (let i = g.popups.length - 1; i >= 0; i--) {
          const pop = g.popups[i];
          pop.y -= 1.2;
          pop.alpha -= 0.025;
          pop.scale = Math.max(1, pop.scale - 0.01);

          ctx.save();
          ctx.translate(pop.x, pop.y);
          ctx.scale(pop.scale, pop.scale);
          ctx.font = '900 16px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = pop.color;
          ctx.globalAlpha = Math.max(0, pop.alpha);
          ctx.shadowColor = '#000000';
          ctx.shadowBlur = 4;
          ctx.fillText(pop.text, 0, 0);
          ctx.restore();

          if (pop.alpha <= 0) {
            g.popups.splice(i, 1);
          }
        }

        // 7. Update Spawn Timer
        const currentSpawnInterval = getSpawnInterval(g.wave);
        if (!g.isWaveTransitioning && time - g.lastSpawnTime >= currentSpawnInterval) {
          spawnBeesForWave(width, height, g.wave);
          g.lastSpawnTime = time;
        }

        // 8. Check Wave Completion
        const waveTotal = getWaveTotalBees(g.wave);
        if (
          g.beesSpawnedInWave >= waveTotal &&
          g.bees.length === 0 &&
          !g.isWaveTransitioning
        ) {
          g.isWaveTransitioning = true;
          const nextWaveNum = g.wave + 1;
          soundManager.playWin();
          setWaveBanner(`🐝 ${t.waveUp || 'موجة جديدة'} (${t.wave} ${nextWaveNum})`);

          setTimeout(() => {
            const game = gameRef.current;
            if (!game.isLoopRunning) return;
            game.wave = nextWaveNum;
            game.beesSpawnedInWave = 0;
            setWave(nextWaveNum);
            setWaveBanner(null);

            // Check if next wave introduces an unseen special bee
            const introducedBee = WAVE_INTRODUCTIONS[nextWaveNum];
            if (introducedBee && !seenBeeIntrosRef.current.has(introducedBee)) {
              setIntroBeeType(introducedBee);
            } else {
              game.lastSpawnTime = performance.now();
              game.isWaveTransitioning = false;
            }
          }, 900);
        }
      } catch (err) {
        console.error('Bee Hive Defense render error:', err);
      }

      if (g.isLoopRunning) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState, handleGameOver, spawnBeesForWave, t]);

  // Canvas resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-full flex-1 min-h-0 flex flex-col bg-slate-950 text-white overflow-hidden select-none font-sans">
      {/* HEADER / HUD */}
      <div className="flex items-center justify-between p-3 bg-slate-900/90 border-b border-slate-800/80 z-20 backdrop-blur-md">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-95 flex items-center gap-1 text-sm font-semibold"
        >
          <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
        </button>

        {/* HUD Center Statistics */}
        <div className="flex items-center gap-3">
          {/* Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div className="text-right">
              <span className="block text-[10px] text-amber-300/80 font-bold uppercase">{t.score}</span>
              <span className="text-sm font-black text-amber-400 leading-none">{score}</span>
            </div>
          </div>

          {/* Best Score Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <Award className="w-4 h-4 text-slate-400" />
            <div className="text-right">
              <span className="block text-[10px] text-white/60 font-bold uppercase">{t.bestScore}</span>
              <span className="text-sm font-black text-slate-200 leading-none">{bestScore}</span>
            </div>
          </div>

          {/* Wave Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-xs">
            <span>{t.wave} {wave}</span>
          </div>
        </div>

        {/* How to Play Button */}
        <button
          onClick={() => setShowHowToPlay(true)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-95"
          title={t.howToPlayTitle}
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* HEALTH BAR DISPLAY */}
      {gameState === 'playing' && (
        <div className="w-full px-4 py-2 bg-slate-900/60 border-b border-slate-800/50 flex items-center justify-between gap-3 z-20">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs shrink-0">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span>{t.hiveHealth}: {hiveHealth}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                hiveHealth > 60
                  ? 'bg-gradient-to-r from-emerald-500 to-amber-400'
                  : hiveHealth > 30
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-gradient-to-r from-rose-600 to-red-500 animate-pulse'
              }`}
              style={{ width: `${hiveHealth}%` }}
            />
          </div>
        </div>
      )}

      {/* WAVE BANNER OVERLAY */}
      <AnimatePresence>
        {waveBanner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute top-28 left-1/2 -translate-x-1/2 z-30 px-6 py-2.5 rounded-2xl bg-amber-500/90 text-slate-950 font-black text-lg shadow-xl shadow-amber-500/20 backdrop-blur-md border border-amber-300"
          >
            {waveBanner}
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW ENEMY INTRODUCTION MODAL OVERLAY */}
      <AnimatePresence>
        {introBeeType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          >
            {(() => {
              const theme = BEE_INTRO_THEMES[introBeeType] || BEE_INTRO_THEMES.speedy;
              const beeInfo = t.enemies?.[introBeeType as keyof typeof t.enemies] || {
                title: introBeeType,
                description: '',
                hits: '1',
                reward: '',
              };

              return (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className={`relative max-w-sm w-full bg-gradient-to-b ${theme.cardGradient} border ${theme.borderColor} rounded-3xl p-6 shadow-2xl ${theme.glowShadow} flex flex-col items-center text-center overflow-hidden`}
                >
                  {/* Top Discovery Badge */}
                  <div className={`px-4 py-1 rounded-full border text-xs font-black uppercase tracking-wider mb-2 ${theme.badgeStyle} flex items-center gap-1.5`}>
                    <span>⚡</span>
                    <span>{t.newEnemyDiscovered}</span>
                  </div>

                  {/* Bee Flapping Animation Artwork */}
                  <div className="my-1">
                    <BeePreviewCanvas beeType={introBeeType} />
                  </div>

                  {/* Title & Description */}
                  <h2 className={`text-2xl font-black mb-1 ${theme.titleColor}`}>
                    {beeInfo.title}
                  </h2>
                  <p className="text-sm font-medium text-slate-300 mb-5">
                    {beeInfo.description}
                  </p>

                  {/* Hits & Reward Badges */}
                  <div className="w-full grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-center justify-center">
                      <span className="text-[11px] font-bold text-slate-400 uppercase mb-0.5">
                        {t.hitsRequired}
                      </span>
                      <span className="text-lg font-black text-white">
                        {beeInfo.hits}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col items-center justify-center">
                      <span className="text-[11px] font-bold text-slate-400 uppercase mb-0.5">
                        {t.rewardLabel}
                      </span>
                      <span className="text-xs font-extrabold text-amber-300 leading-tight">
                        {beeInfo.reward}
                      </span>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinueFromIntro}
                    className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${theme.btnStyle}`}
                  >
                    <span>{t.continue}</span>
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* READY COUNTDOWN OVERLAY */}
      <AnimatePresence mode="wait">
        {countdownStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              key={countdownStep}
              initial={{ scale: 2.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="text-center"
            >
              <span
                className={`font-black tracking-widest drop-shadow-[0_0_35px_rgba(251,191,36,0.6)] ${
                  countdownStep === (t.ready || 'READY')
                    ? 'text-5xl text-amber-400'
                    : countdownStep === (t.go || 'GO!')
                    ? 'text-7xl text-emerald-400 drop-shadow-[0_0_40px_rgba(34,197,94,0.8)]'
                    : 'text-8xl text-sky-400 drop-shadow-[0_0_40px_rgba(56,189,248,0.8)]'
                }`}
              >
                {countdownStep}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN GAME CANVAS */}
      <div className="relative flex-1 w-full h-full min-h-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          className="w-full h-full touch-none cursor-crosshair"
        />

        {/* START SCREEN OVERLAY */}
        {gameState === 'start' && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6"
            >
              {/* Central Glowing Icon */}
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-xl shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-4xl">
                  🐝
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-black text-amber-400 mb-2">
                  {t.title}
                </h1>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t.desc}
                </p>
              </div>

              {/* High Score Badge */}
              <div className="w-full p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Trophy className="w-4 h-4" />
                  {t.bestScore}: {bestScore}
                </span>
                <span className="text-emerald-400 font-bold">Endless Mode</span>
              </div>

              {/* Actions */}
              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={startGame}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>{t.startGame}</span>
                </button>

                <button
                  onClick={() => setShowHowToPlay(true)}
                  className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{t.howToPlayTitle}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* GAME OVER SCREEN OVERLAY */}
        {gameState === 'game_over' && (
          <div className="absolute inset-0 z-30 bg-slate-950/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
                <ShieldAlert className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-rose-400 mb-1">
                  {t.gameOverTitle}
                </h2>
                {isNewRecord && (
                  <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-full mb-2">
                    {t.newHighScore}
                  </span>
                )}
              </div>

              {/* Game Stats Card */}
              <div className="w-full bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 space-y-3.5 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-slate-700/50">
                  <span className="text-slate-300 font-bold flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    {t.score}:
                  </span>
                  <span className="text-amber-400 font-black text-2xl">{score}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-700/50">
                  <span className="text-slate-300 font-bold flex items-center gap-2">
                    <Award className="w-4 h-4 text-indigo-400" />
                    {t.waveReached}:
                  </span>
                  <span className="text-indigo-400 font-black text-2xl">{wave}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-700/50">
                  <span className="text-slate-300 font-medium flex items-center gap-2">
                    <span>🐝</span>
                    {t.beesSquished}:
                  </span>
                  <span className="text-slate-200 font-extrabold text-lg">{beesSquished}</span>
                </div>

                <div className="flex justify-between items-center pt-1 text-xs">
                  <span className="text-slate-400 font-medium">{t.bestScore}:</span>
                  <span className="text-amber-300 font-bold">{bestScore}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex gap-3">
                <button
                  onClick={startGame}
                  className="flex-1 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>إعادة اللعب</span>
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-all active:scale-95 cursor-pointer"
                >
                  القائمة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* HOW TO PLAY MODAL */}
      <AnimatePresence>
        {showHowToPlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 text-right relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-black text-amber-400 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  {t.howToPlayTitle}
                </h2>
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                  <span className="text-base">🐝</span>
                  <span><strong>النحلة العادية:</strong> اضغط عليها بلمسة واحدة للقضاء عليها (+10 نقاط).</span>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                  <span className="text-base">⚡</span>
                  <span><strong>النحلة الزرقاء السريعة:</strong> صغيرة وسريعة جداً (+15 نقطة).</span>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                  <span className="text-base">🛡️</span>
                  <span><strong>النحلة الضخمة:</strong> تحتاج 2 لمسات للقضاء عليها وتحمل علامات ضربة (+20 نقطة).</span>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                  <span className="text-base">👑</span>
                  <span><strong>الملكة الذهبية:</strong> ضخمة بكتلة تاج ملكي تحتاج 5 لمسات (+100 نقطة!).</span>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-3">
                  <span className="text-base">🐍</span>
                  <span><strong>النحلة الخضراء (الزجزاج):</strong> تتحرك بمسار منحني زجزاج نحو الخلية (+15 نقطة).</span>
                </div>

                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 flex items-start gap-3">
                  <span className="text-base">⭐</span>
                  <span><strong>النحلة الذهبية وقطرة العسل:</strong> القضاء عليها أو لمس قطرة العسل يسترجع 10% من صحة الخلية!</span>
                </div>
              </div>

              <button
                onClick={() => setShowHowToPlay(false)}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm cursor-pointer"
              >
                حسناً، فهمت!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
