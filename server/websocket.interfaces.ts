import { Namespace, Socket } from 'socket.io';

export interface SocketHandlerInterface {
  handleConnection(socket: Socket): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middlewareImplementation?(socket: Socket, next: any): void;
  additionalSetup(namespace: Namespace): void;
}

export type HandlerParam = { path: string; handler: SocketHandlerInterface };
