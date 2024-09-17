import {
  SessionStateInterface,
  Ticket,
} from '~/shared/session-state.interface';

export type Response<T> = {
  data: T;
};

export type GetSessionStateResponse = Response<SessionStateInterface>;
export type CreateSessionStateResponse = Response<SessionStateInterface>;
export type CreateTicketResponse = Response<Ticket>;
export type UpdateTicketResponse = Response<Ticket>;
