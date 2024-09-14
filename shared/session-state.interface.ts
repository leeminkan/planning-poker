export interface SessionStateInterface {
  id: string;
  isRevealed: boolean;
  players: {
    id: string;
    currentCard: string | null;
  }[];
  averagePoint: number;
}
