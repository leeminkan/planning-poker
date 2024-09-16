import http from 'http';

import app from './app';
import { SessionSocket } from './modules/session/session-socket.handler';
import Websocket from './websocket';

const httpServer = http.createServer(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const io = Websocket.initInstance(httpServer);
io.initializeHandlers([{ path: '/sessions', handler: new SessionSocket() }]);

const port = process.env.PORT || 3000;
httpServer.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`),
);
