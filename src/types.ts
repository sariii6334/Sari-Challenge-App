export type Language = 'ar' | 'en' | 'tr' | 'de' | 'fr' | 'ko' | 'nl' | 'es' | 'hi' | 'zh';

export type GameId =
  | 'perfect-hold'
  | '21-game'
  | 'perfect-line'
  | 'perfect-circle'
  | 'memory-order'
  | 'color-trap'
  | 'code-break'
  | 'copy-move'
  | 'missing-piece'
  | 'wrong-answer'
  | 'number-rush'
  | 'tic-tac-toe'
  | 'same-word'
  | 'connect-four'
  | 'bee-hive-defense';

export type GameMode = 'solo' | 'friend' | 'ai';

export interface AppSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  language: Language;
  player1Name: string;
  player2Name: string;
  showPreGameExplanation: boolean;
  hasSelectedLanguage: boolean;
}

export interface GameInfo {
  id: GameId;
  titleKey: string;
  descKey: string;
  iconName: string;
  color: string; // Tailwind color class / hex
  bgGradient: string;
  accentColor: string;
  badge: string;
  tag?: 'HOT' | 'NEW' | 'POPULAR';
  category?: 'reaction' | 'logic' | 'puzzle' | 'board' | 'casual';
  supportsSolo: boolean;
  supportsAI: boolean;
  supportsFriend?: boolean;
}

export interface PlayerResult {
  playerName: string;
  score: number | string;
  secondaryMetric?: string | number; // e.g. time, accuracy %, difference
  details?: Record<string, string | number | boolean>;
}

export interface GameResult {
  gameId: GameId;
  mode: GameMode;
  targetOrRef?: string | number;
  player1: PlayerResult;
  player2?: PlayerResult;
  winner?: 'player1' | 'player2' | 'draw' | 'ai';
  grade?: string;
}

export interface Translations {
  appName: string;
  appSubtitle: string;
  createdBy: string;
  version: string;

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

  rewardAds?: string;
  watchRewardAd?: string;
  adNotReady?: string;
  adClosed?: string;
  rewardGranted?: string;

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

  soundEffects: string;
  vibration: string;
  appLanguage: string;
  player1NameLabel: string;
  player2NameLabel: string;
  resetNames: string;
  showPreGameInfo: string;
  resetSettings: string;

  games: Record<string, any>;
}
