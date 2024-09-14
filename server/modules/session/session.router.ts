import { Router, Request, Response } from "express";
import { sessionStateRepository } from "./session-state.repository";

const sessionRouter = Router();

sessionRouter.get("/:id", (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(404).send({
      message: "Not found!",
    });
  }

  const session = sessionStateRepository.findById(req.params.id);

  if (!session) {
    return res.status(404).send({
      message: "Not found!",
    });
  }

  return res.send({
    data: session,
  });
});

sessionRouter.post("/", (req: Request, res: Response) => {
  const session = sessionStateRepository.create();

  return res.send({
    data: session,
  });
});

export { sessionRouter };
