export interface SessionStateInterface {
  id: string;
  isRevealed: boolean;
  players: {
    id: string;
    name?: string;
    currentCard: string | null;
  }[];
  averagePoint: number;
  createdAt: Date;
  updatedAt: Date;
}
