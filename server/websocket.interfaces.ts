import { Namespace, Socket } from "socket.io";

import { UserSession } from "./modules/user-session/user-session.repository";

export interface SocketHandlerInterface {
  handleConnection(socket: Socket): void;
  handleConnection(socket: Socket): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middlewareImplementation?(socket: Socket, next: any): void;
  additionalSetup(namespace: Namespace): void;
}

export type HandlerParam = { path: string; handler: SocketHandlerInterface };

export type SocketWithUser = Socket & {
  user: UserSession;
};
