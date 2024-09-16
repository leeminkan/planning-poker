import { Socket } from 'socket.io';

import { UserSessionState } from '../user-session/user-session-state.entity';

export type SocketWithUser = Socket & {
  user: UserSessionState;
};
