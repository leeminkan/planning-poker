import { createRequestHandler } from "@remix-run/express";
import { type ServerBuild } from "@remix-run/node";
import compression from "compression";
import express, { Router, Express } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import { AppDataSource } from "./data-source";
import { sessionRouter } from "./modules/session/session.router";
import { ticketRouter } from "./modules/ticket/ticket.router";
import { ZodError } from "zod";

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app: Express = express();

app.use(compression());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

app.use(morgan("tiny"));

async function getBuild() {
  try {
    const build = viteDevServer
      ? await viteDevServer.ssrLoadModule("virtual:remix/server-build")
      : // eslint-disable-next-line import/no-unresolved
        await import("../build/server/remix.js");

    return { build: build as unknown as ServerBuild, error: null };
  } catch (error) {
    // Catch error and return null to make express happy and avoid an unrecoverable crash
    console.error("Error creating build:", error);
    return { error: error, build: null as unknown as ServerBuild };
  }
}

// init database connection
await AppDataSource.initialize();

// router
const rootRouter = Router();
rootRouter.use("/sessions", sessionRouter);
rootRouter.use("/tickets", ticketRouter);
app.use("/api", rootRouter);

// handle SSR requests
app.all(
  "*",
  createRequestHandler({
    build: async () => {
      const { error, build } = await getBuild();
      if (error) {
        throw error;
      }
      return build;
    },
  })
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: "Bad request!",
      error: err,
    });
  }
  return res.status(500).send({
    message: "Something was wrong!",
  });
});

export default app;
