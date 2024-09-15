import { Server, Socket } from "socket.io";
import http from "http";
import { HandlerParam } from "./websocket.interfaces";

const WEBSOCKET_CORS = {
  origin: "*",
  methods: ["GET", "POST"],
};

class Websocket extends Server {
  private static io: Websocket;

  constructor(httpServer: http.Server) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static initInstance(httpServer: http.Server): Websocket {
    if (!Websocket.io) {
      Websocket.io = new Websocket(httpServer);
    }

    return Websocket.io;
  }

  public static getInstance(): Websocket {
    if (!Websocket.io) {
      throw new Error("Socket is not initiated!");
    }
    return Websocket.io;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public initializeHandlers(socketHandlers: Array<HandlerParam>) {
    socketHandlers.forEach((element) => {
      const namespace = Websocket.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }

      if (element.handler.additionalSetup) {
        element.handler.additionalSetup(namespace);
      }
    });
  }
}

export default Websocket;
