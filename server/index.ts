import http from "http";

import app from "./app";
import Websocket from "./websocket";

import { SessionSocket } from "./modules/session/session-socket.handler";

const httpServer = http.createServer(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const io = Websocket.getInstance(httpServer);
io.initializeHandlers([{ path: "/sessions", handler: new SessionSocket() }]);

const port = process.env.PORT || 3000;
httpServer.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);
