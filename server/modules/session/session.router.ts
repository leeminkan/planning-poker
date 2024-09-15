import { Router, Request, Response } from "express";
import { sessionStateRepository } from "./session-state.repository";
import { sessionRepository } from "./session.repository";

const sessionRouter = Router();

sessionRouter.get("/:id", async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(404).send({
      message: "Not found!",
    });
  }

  let sessionState = sessionStateRepository.findById(req.params.id);

  if (!sessionState) {
    const persistedSession = await sessionRepository.findById(req.params.id);
    if (!persistedSession) {
      return res.status(404).send({
        message: "Not found!",
      });
    }
    sessionState = sessionStateRepository.create({ id: req.params.id });
  }

  return res.send({
    data: sessionState,
  });
});

sessionRouter.post("/", async (req: Request, res: Response) => {
  const session = sessionStateRepository.create();
  await sessionRepository
    .create({
      id: session.id,
      name: "",
    })
    .catch((error) => {
      sessionStateRepository.removeById(session.id);
      throw error;
    });

  return res.send({
    data: session,
  });
});

export { sessionRouter };
