import { UserSessionStateInterface } from '~/shared/user-session.interface';

export type Response<T> = {
  data: T;
};

export type UpdateUserSessionResponse = Response<UserSessionStateInterface>;
