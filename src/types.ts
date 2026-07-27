export type Language = 'ar' | 'en' | 'tr' | 'de' | 'fr' | 'ko' | 'nl' | 'es';

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
