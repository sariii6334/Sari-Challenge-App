import { Language } from '../types';
import { ar } from './locales/ar';
import { en } from './locales/en';
import { tr } from './locales/tr';
import { de } from './locales/de';
import { fr } from './locales/fr';
import { ko } from './locales/ko';
import { nl } from './locales/nl';
import { es } from './locales/es';
import { hi } from './locales/hi';
import { zh } from './locales/zh';

export interface Translations {
  appName: string;
  appSubtitle: string;
  createdBy: string;
  version: string;

  // Language names
  arabic: string;
  english: string;
  turkish: string;
  german: string;
  french: string;
  korean: string;
  dutch: string;
  spanish: string;
  hindi: string;
  chinese: string;
  selectLanguageTitle: string;
  selectLanguageSubtitle: string;

  // Common UI
  start: string;
  startGame: string;
  playAgain: string;
  mainMenu: string;
  back: string;
  settings: string;
  about: string;
  gameGuide: string;
  howToPlay: string;
  close: string;
  next: string;
  save: string;
  reset: string;
  dontShowAgain: string;
  finishGame: string;
  wins: string;
  bestTime: string;
  roundNew: string;
  turnNow: string;
  reached21Lost: string;
  wonRound: string;
  watchAdForRetry: string;
  
  // Game modes
  playSolo: string;
  playWithFriend: string;
  playVsAI: string;
  selectMode: string;
  selectModeSubtitle: string;
  aiModeDesc: string;
  friendModeDesc: string;
  soloModeDesc: string;
  friendTurnDesc: string;
  soloResultSubtitle: string;
  versusResultSubtitle: string;
  
  // Players
  player1Default: string;
  player2Default: string;
  computerName: string;
  player1Turn: string;
  player2Turn: string;
  computerTurn: string;
  winner: string;
  draw: string;
  congratulations: string;
  gameOver: string;
  passDeviceTo: string;
  startPlayerTurn: string;
  finishedTurn: string;
  
  // Metrics & Grades
  score: string;
  accuracy: string;
  time: string;
  attempts: string;
  bestScore: string;
  targetTime: string;
  actualTime: string;
  difference: string;
  grade: string;
  level: string;
  round: string;
  excellent: string;
  veryGood: string;
  good: string;
  tryAgain: string;

  // Settings labels
  soundEffects: string;
  vibration: string;
  appLanguage: string;
  player1NameLabel: string;
  player2NameLabel: string;
  resetNames: string;
  showPreGameInfo: string;
  resetSettings: string;

  // Game specific titles & short pre-game guides
  games: {
    'perfect-hold': {
      title: string;
      desc: string;
      guide: string[];
      targetMsg: string;
      memorizeMsg: string;
      stopWhenReady: string;
      pressToStart: string;
      stop: string;
    };
    '21-game': {
      title: string;
      desc: string;
      guide: string[];
      currentCount: string;
      say1: string;
      say2: string;
      say3: string;
      forced21Lose: string;
    };
    'perfect-line': {
      title: string;
      desc: string;
      guide: string[];
      refLineMsg: string;
      drawNow: string;
      drawnLength: string;
      targetLength: string;
      clearCanvas: string;
    };
    'perfect-circle': {
      title: string;
      desc: string;
      guide: string[];
      refCircleMsg: string;
      drawCircleNow: string;
      smoothness: string;
      circularity: string;
    };
    'memory-order': {
      title: string;
      desc: string;
      guide: string[];
      watchSequence: string;
      repeatSequence: string;
      correctSequence: string;
      wrongSequence: string;
    };
    'color-trap': {
      title: string;
      desc: string;
      guide: string[];
      clickInkColor: string;
      red: string;
      blue: string;
      green: string;
      yellow: string;
      purple: string;
      orange: string;
    };
    'code-break': {
      title: string;
      desc: string;
      guide: string[];
      legendGreen: string;
      legendBlue: string;
      legendRed: string;
      guessPlaceholder: string;
      submitGuess: string;
      history: string;
      codeCracked: string;
    };
    'copy-move': {
      title: string;
      desc: string;
      guide: string[];
      watchArrows: string;
      drawOnPad: string;
      up: string;
      down: string;
      left: string;
      right: string;
    };
    'missing-piece': {
      title: string;
      desc: string;
      guide: string[];
      memorizeItems: string;
      findMissing: string;
      dropHere: string;
    };
    'wrong-answer': {
      title: string;
      desc: string;
      guide: string[];
      chooseWrong: string;
      timeLeft: string;
      avgTime: string;
    };
    'number-rush': {
      title: string;
      desc: string;
      guide: string[];
      nextNumber: string;
      currentNumber: string;
      rankLegendary: string;
      rankGold: string;
      rankSilver: string;
      rankBronze: string;
      timeDifference: string;
      tapToStart: string;
      tapInOrder: string;
    };
    'tic-tac-toe': {
      title: string;
      desc: string;
      guide: string[];
      playerX: string;
      playerO: string;
      aiTurn: string;
      yourTurn: string;
      xWins: string;
      oWins: string;
      draw: string;
      difficulty: string;
      hardAI: string;
      score: string;
      round: string;
    };
    'same-word': {
      title: string;
      desc: string;
      guide: string[];
      quickHowToPlay: string;
      step1: string;
      step2: string;
      step3: string;
      targetWordsNextRound: string;
      readyToStart: string;
      privacyNotice: string;
      initialRoundHint: string;
      bridgeRoundHint: string;
      thinkBridgeWord: string;
      inputSecretPlaceholder: string;
      inputBridgePlaceholder: string;
      confirmWord: string;
      mismatchTitle: string;
      mismatchSub: string;
      mismatchTargetHint: string;
      nextRoundBtn: string;
      perfectMatchBadge: string;
      victoryTitle: string;
      victoryMsg: string;
      sharedWord: string;
      associationHistory: string;
      historyModalTitle: string;
      helpModalTitle: string;
      rulesUnderstood: string;
      ruleTarget: string;
      rule1: string;
      rule2: string;
      rule3: string;
    };
    'connect-four': {
      title: string;
      desc: string;
      guide: string[];
      p1Wins: string;
      p2Wins: string;
      aiWins: string;
      draw: string;
      selectDifficulty: string;
      easy: string;
      medium: string;
      hard: string;
      easyDesc: string;
      mediumDesc: string;
      hardDesc: string;
      p1Turn: string;
      p2Turn: string;
      aiTurn: string;
      aiThinking: string;
      dropHere: string;
      winsCount: string;
      round: string;
    };
    'bee-hive-defense': {
      title: string;
      desc: string;
      guide: string[];
      hiveHealth: string;
      score: string;
      bestScore: string;
      wave: string;
      combo: string;
      startGame: string;
      howToPlayTitle: string;
      rule1: string;
      rule2: string;
      rule3: string;
      rule4: string;
      rule5: string;
      gameOverTitle: string;
      newHighScore: string;
      beesSquished: string;
      waveReached: string;
      waveUp: string;
      warning: string;
      newEnemyDiscovered: string;
      continue: string;
      ready: string;
      go: string;
      hitsRequired: string;
      rewardLabel: string;
      enemies: {
        speedy: {
          title: string;
          description: string;
          hits: string;
          reward: string;
        };
        fat: {
          title: string;
          description: string;
          hits: string;
          reward: string;
        };
        zigzag: {
          title: string;
          description: string;
          hits: string;
          reward: string;
        };
        queen: {
          title: string;
          description: string;
          hits: string;
          reward: string;
        };
        golden: {
          title: string;
          description: string;
          hits: string;
          reward: string;
        };
      };
    };
  };
}

export const translations: Record<Language, Translations> = {
  ar,
  en,
  tr,
  de,
  fr,
  ko,
  nl,
  es,
  hi,
  zh,
};

export function getTranslations(lang?: Language): Translations {
  if (lang && translations[lang]) {
    return translations[lang];
  }
  return translations.ar || translations.en;
}
