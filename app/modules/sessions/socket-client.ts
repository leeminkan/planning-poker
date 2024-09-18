import { Socket, io } from 'socket.io-client';

class SocketClient extends Socket {
  private static socket: Socket | null = null;

  public static init(host: string, token: string): Socket {
    if (!SocketClient.socket) {
      SocketClient.socket = io(host, {
        auth: {
          token,
        },
      });
    }
    return SocketClient.socket;
  }

  public static getInstance(): Socket {
    if (!SocketClient.socket) {
      throw new Error('Instance not found!');
    }

    return SocketClient.socket;
  }

  public static disconnect() {
    if (!SocketClient.socket) {
      throw new Error('Instance not found!');
    }

    SocketClient.socket.disconnect();
    SocketClient.socket = null;
  }
}

export default SocketClient;
