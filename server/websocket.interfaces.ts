import { Socket } from "socket.io";

import { User } from "./modules/user/user.repository";

export interface SocketHandlerInterface {
  handleConnection(socket: Socket): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middlewareImplementation?(socket: Socket, next: any): void;
}

export type HandlerParam = { path: string; handler: SocketHandlerInterface };

export type SocketWithUser = Socket & {
  user: User;
};
