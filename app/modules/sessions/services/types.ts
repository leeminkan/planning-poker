import { SessionStateInterface } from "~/shared/session-state.interface";

export type Response<T> = {
  data: T;
};

export type GetSessionStateResponse = Response<SessionStateInterface>;
export type CreateSessionStateResponse = Response<SessionStateInterface>;
