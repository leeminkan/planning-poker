export interface Player {
  id: string;
  name?: string;
  currentCard: string | null;
}
export interface Ticket {
  id: string;
  title: string;
  description: string;
}
export interface SessionStateInterface {
  id: string;
  isRevealed: boolean;
  players: Player[];
  tickets: Ticket[];
  currentTicketId?: string;
  averagePoint: number;
  createdAt: Date;
  updatedAt: Date;
}
