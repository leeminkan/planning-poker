import { Socket } from "socket.io";
import {
  SocketHandlerInterface,
  SocketWithUser,
} from "../../websocket.interfaces";
import {
  SLE_DISCONNECT,
  SLE_JOIN_SESSION,
  SLE_PING,
  SSE_INIT_SESSION,
  SSE_PING,
} from "~/shared/socket-event";
import { sessionStateRepository } from "./session-state.repository";
import { userRepository } from "../user/user.repository";

export class SessionSocket implements SocketHandlerInterface {
  handleConnection(socket: Socket) {
    const socketWithUser = this.initUser(socket);

    socketWithUser.emit(SSE_PING, "Ping from server!");
    socketWithUser.on(SLE_PING, (value) => {
      console.log("Received", value);
    });

    socketWithUser.on(SLE_JOIN_SESSION, (sessionId: string) => {
      // validate
      if (!sessionId) return;

      let sessionState = sessionStateRepository.findById(sessionId);

      if (!sessionState) {
        sessionState = sessionStateRepository.create(sessionId);
      }

      sessionState.addNewPlayer(socketWithUser.user.id);
      socketWithUser.user.setCurrentSession(sessionId);

      socketWithUser.emit(SSE_INIT_SESSION, sessionState);
    });

    socketWithUser.on(SLE_DISCONNECT, () => {
      console.log("CLIENT DISCONNECT", socketWithUser.user.id);
      if (socketWithUser.user.currentSessionId) {
        const sessionState = sessionStateRepository.findById(
          socketWithUser.user.currentSessionId
        );
        if (!sessionState) return;
        sessionState.removePlayer(socketWithUser.user.id);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middlewareImplementation(socket: Socket, next: any) {
    //Implement your middleware for session here
    return next();
  }

  initUser(socket: Socket): SocketWithUser {
    const user = userRepository.create();
    (socket as SocketWithUser).user = user;
    return socket as SocketWithUser;
  }
}
