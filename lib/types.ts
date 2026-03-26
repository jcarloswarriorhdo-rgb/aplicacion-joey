export interface GameOption {
  label: string;
  emoji?: string;
  color?: string;
  correct: boolean;
}

export interface GameQuestion {
  instruction: string;
  display: string;
  options: GameOption[];
}
