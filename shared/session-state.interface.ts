export interface Player {
  id: string;
  name?: string;
  currentCard: string | null;
}
export interface Ticket {
  id: string;
  title: string;
  description: string;
  point?: number;
}
export interface SessionStateInterface {
  id: string;
  name: string;
  isRevealed: boolean;
  players: Player[];
  tickets: Ticket[];
  currentTicketId?: string;
  averagePoint: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketEntityInterface {
  id: string;
  title: string;
  description: string;
  point?: number;
}

export interface SessionEntityInterface {
  id: string;
  name: string;
  tickets: TicketEntityInterface[];
  createdAt: Date;
  updatedAt: Date;
}
