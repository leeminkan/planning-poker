import { SessionStateInterface } from './session-state.interface';
import { UserSessionStateInterface } from './user-session.interface';

export type SLEJoinSessionPayload = { sessionId: string };
export type SLESetIsRevealedSessionPayload = {
  sessionId: string;
  isRevealed: boolean;
};
export type SLEResetSessionPayload = { sessionId: string };
export type SLEChooseCardPayload = { sessionId: string; card: string };
export type SLEUnselectCardPayload = { sessionId: string };
export type SLEChooseTicketPayload = { sessionId: string; ticketId: string };
export type SSESyncSessionPayload = SessionStateInterface;
export type SSEInitSessionPayload = SessionStateInterface;
export type SSESyncUserPayload = UserSessionStateInterface;
