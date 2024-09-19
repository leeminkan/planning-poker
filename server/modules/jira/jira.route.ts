import { Request, Response, Router } from 'express';

import {
  QueryIssueDto,
  SetupApiKeyDto,
  SetupSyncDto,
  queryIssueSchema,
  setupApiKeySchema,
  setupSyncSchema,
} from '~/shared/jira.dto';

import {
  RequestWithUser,
  authenticateMiddleware,
} from '~/server/auth.middleware';

import { removeUndefinedValuesFromObject } from '../session/utils';
import { jiraRepository } from './jira.repository';
import { JiraService } from './jira.service';

const jiraRouter = Router();

jiraRouter.post(
  '/setup-api-key',
  authenticateMiddleware,
  async (req: Request, res: Response, next) => {
    const reqWithUser = req as RequestWithUser;
    try {
      const body: SetupApiKeyDto = setupApiKeySchema.parse(req.body);
      const jiraService = new JiraService(body.host, body.email, body.token);
      const isValid = await jiraService.checkValid();
      if (!isValid) {
        return res.status(400).send({
          message: 'Invalid Params',
        });
      }

      let jira = await jiraRepository.findOneBySessionId(body.sessionId);

      if (!jira) {
        jira = await jiraRepository.create({
          userId: reqWithUser.user.id,
          ...body,
        });
      } else {
        await jiraRepository.updateById(jira.id, body);
      }

      return res.send({
        data: jira,
      });
    } catch (error) {
      next(error);
    }
  },
);

jiraRouter.post(
  '/setup-sync',
  authenticateMiddleware,
  async (req: Request, res: Response, next) => {
    try {
      const body: SetupSyncDto = setupSyncSchema.parse(req.body);
      const jira = await jiraRepository.findOneBySessionId(body.sessionId);

      if (!jira) {
        return res.status(404).send({
          message: 'Not found!',
        });
      }

      await jiraRepository.updateById(jira.id, body);

      return res.send({
        data: Object.assign(jira, removeUndefinedValuesFromObject(body)),
      });
    } catch (error) {
      next(error);
    }
  },
);

jiraRouter.post(
  '/issues',
  authenticateMiddleware,
  async (req: Request, res: Response, next) => {
    try {
      const body: QueryIssueDto = queryIssueSchema.parse(req.body);
      const jira = await jiraRepository.findOneBySessionId(body.sessionId);
      if (!jira) {
        return res.status(404).send({
          message: 'Not found!',
        });
      }

      const jiraService = new JiraService(jira.host, jira.email, jira.token);
      const issues = await jiraService.fetchIssuesByJql(body.jql);

      return res.send({
        data: issues,
      });
    } catch (error) {
      next(error);
    }
  },
);

export { jiraRouter };
