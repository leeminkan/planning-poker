import EventEmitter from 'node:events';
import { Namespace, Socket } from 'socket.io';

import {
  SLE_CHOOSE_CARD,
  SLE_CHOOSE_TICKET,
  SLE_DISCONNECT,
  SLE_JOIN_SESSION,
  SLE_PING,
  SLE_RESET_SESSION,
  SLE_SET_IS_REVEALED_SESSION,
  SLE_UNSELECT_CARD,
  SSE_INIT_SESSION,
  SSE_PING,
  SSE_RESET_SESSION,
  SSE_SYNC_SESSION,
  SSE_SYNC_USER,
} from '~/shared/socket-event';
import {
  SLEChooseCardPayload,
  SLEChooseTicketPayload,
  SLEJoinSessionPayload,
  SLEResetSessionPayload,
  SLESetIsRevealedSessionPayload,
  SLEUnselectCardPayload,
  SSESyncSessionPayload,
  SSESyncUserPayload,
} from '~/shared/socket-event.types';

import { SocketHandlerInterface } from '~/server/websocket.interfaces';

import { userSessionStateRepository } from '../user-session/user-session-state.repository';
import { SocketWithUser } from './session-socket.types';
import { sessionStateRepository } from './session-state.repository';
import { sessionService } from './session.service';
import { getFormattedSessionRoom, getFormattedUserSessionRoom } from './utils';

export const sessionEventEmitter = new EventEmitter();

export class SessionSocket implements SocketHandlerInterface {
  handleConnection(socketWithUser: SocketWithUser) {
    socketWithUser.emit(SSE_PING, 'Ping from server!');
    socketWithUser.on(SLE_PING, (value) => {
      console.log('SLE_PING', value);
    });
    socketWithUser.emit(SSE_SYNC_USER, socketWithUser.user);
    socketWithUser.join(getFormattedUserSessionRoom(socketWithUser.user.id));

    socketWithUser.on(
      SLE_JOIN_SESSION,
      async ({ sessionId }: SLEJoinSessionPayload) => {
        console.log('SLE_JOIN_SESSION', { sessionId });
        // validate
        if (!sessionId) return;

        const sessionState =
          await sessionService.getOrCreateSessionStateFromPersistedSession({
            sessionId,
          });
        if (!sessionState) return;

        socketWithUser.user.setCurrentSession(sessionState.id);
        sessionState.addNewPlayer({
          id: socketWithUser.user.id,
          name: socketWithUser.user.name,
        });

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.join(socketRoomId);

        socketWithUser.emit(
          SSE_SYNC_USER,
          socketWithUser.user as SSESyncUserPayload,
        );
        socketWithUser.emit(
          SSE_INIT_SESSION,
          sessionState as SSESyncSessionPayload,
        );
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      },
    );

    socketWithUser.on(
      SLE_SET_IS_REVEALED_SESSION,
      ({ sessionId, isRevealed }: SLESetIsRevealedSessionPayload) => {
        console.log('SLE_SET_IS_REVEALED_SESSION', { sessionId, isRevealed });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.setIsRevealed(isRevealed);

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      },
    );

    socketWithUser.on(
      SLE_RESET_SESSION,
      ({ sessionId }: SLEResetSessionPayload) => {
        console.log('SLE_RESET_SESSION', { sessionId });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.reset();

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp.to(socketRoomId).emit(SSE_RESET_SESSION);
      },
    );

    socketWithUser.on(
      SLE_CHOOSE_CARD,
      ({ sessionId, card }: SLEChooseCardPayload) => {
        console.log('SLE_CHOOSE_CARD', { sessionId });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.chooseCardByPlayerId(socketWithUser.user.id, card);

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      },
    );

    socketWithUser.on(
      SLE_UNSELECT_CARD,
      ({ sessionId }: SLEUnselectCardPayload) => {
        console.log('SLE_UNSELECT_CARD', { sessionId });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.unselectCardByPlayerId(socketWithUser.user.id);

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      },
    );

    socketWithUser.on(
      SLE_CHOOSE_TICKET,
      ({ sessionId, ticketId }: SLEChooseTicketPayload) => {
        console.log('SLE_CHOOSE_TICKET', { sessionId, ticketId });
        // validate
        if (!sessionId) return;

        const sessionState = sessionStateRepository.findById(sessionId);

        if (!sessionState) {
          return;
        }

        sessionState.setCurrentTicket(ticketId);

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      },
    );

    socketWithUser.on(SLE_DISCONNECT, async () => {
      console.log('CLIENT DISCONNECT', socketWithUser.user.id);
      if (socketWithUser.user.currentSessionId) {
        const sessionState = sessionStateRepository.findById(
          socketWithUser.user.currentSessionId,
        );
        if (!sessionState) return;
        const sockets = await socketWithUser
          .in(getFormattedUserSessionRoom(socketWithUser.user.id))
          .fetchSockets();
        if (sockets.length === 0) {
          console.log('LAST SOCKET OF USER', socketWithUser.user.id);
          sessionState.removePlayer(socketWithUser.user.id);
        }

        const socketRoomId = getFormattedSessionRoom(sessionState.id);
        socketWithUser.nsp
          .to(socketRoomId)
          .emit(SSE_SYNC_SESSION, sessionState as SSESyncSessionPayload);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middlewareImplementation(socket: Socket, next: any) {
    //Implement your middleware for session here
    const token = socket.handshake.auth.token;
    let user = token
      ? userSessionStateRepository.findById(token)
      : userSessionStateRepository.create();

    if (!user) {
      user = userSessionStateRepository.create();
    }
    (socket as SocketWithUser).user = user;
    return next();
  }

  additionalSetup(namespace: Namespace): void {
    // EVENT EMITTER
    sessionEventEmitter.on(
      SSE_SYNC_SESSION,
      async (payload: SSESyncSessionPayload) => {
        namespace
          .in(getFormattedSessionRoom(payload.id))
          .emit(SSE_SYNC_SESSION, payload);
      },
    );
    sessionEventEmitter.on(
      SSE_SYNC_USER,
      async (payload: SSESyncUserPayload) => {
        namespace
          .to(getFormattedUserSessionRoom(payload.id))
          .emit(SSE_SYNC_USER, payload);
      },
    );
  }
}
