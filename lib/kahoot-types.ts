// Coral · Cyan · Amber · Esmeralda
export const ANSWER_COLORS = ['#ff4d6d', '#00c2d4', '#ffb703', '#06d6a0'] as const;
export const ANSWER_SHAPES = ['▲', '◆', '●', '■'] as const;
export const ANSWER_LABELS = ['A', 'B', 'C', 'D'] as const;

export const KAHOOT_BG = "linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 50%,#f0fdf4 100%)";

export interface KahootQuestion {
  text: string;
  image?: string;
  timeLimit: number; // seconds
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
}

export interface KahootPlayer {
  score: number;
  streak: number;
}

export type GameStatus = 'lobby' | 'question' | 'leaderboard' | 'finished';

export interface LastResult {
  answer: number;   // what the player chose (-1 = no answer)
  correct: boolean;
  points: number;
}

export interface KahootGame {
  id: string;
  pin: string;
  status: GameStatus;
  questions: KahootQuestion[];
  currentQuestion: number;
  questionStartTime: number; // Date.now()
  players: Record<string, KahootPlayer>; // key = player name
  // During 'question': tracks who answered and when
  currentAnswers: Record<string, { answer: number; submittedAt: number }>;
  // After reveal: results of the last question
  lastResults: Record<string, LastResult>;
}

export function calcPoints(elapsed: number, timeLimit: number): number {
  const ratio = Math.max(0, Math.min(1, elapsed / (timeLimit * 1000)));
  return Math.round(1000 - 500 * ratio); // 1000 → 500
}
