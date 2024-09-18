import { Request, Response, Router } from 'express';

import {
  QueryIssueDto,
  SetupApiKeyDto,
  queryIssueSchema,
  setupApiKeySchema,
} from '~/shared/jira.dto';

import { userSessionStateRepository } from '../user-session/user-session-state.repository';
import { jiraRepository } from './jira.repository';
import { JiraService } from './jira.service';

const jiraRouter = Router();

jiraRouter.post('/setup-api-key', async (req: Request, res: Response, next) => {
  try {
    const body: SetupApiKeyDto = setupApiKeySchema.parse(req.body);
    const user = userSessionStateRepository.findById(body.userId);
    if (!user) {
      return res.status(400).send({
        message: 'Invalid Params',
      });
    }

    const jiraService = new JiraService(body.host, body.email, body.token);
    const isValid = await jiraService.checkValid();
    if (!isValid) {
      return res.status(400).send({
        message: 'Invalid Params',
      });
    }

    let jira = await jiraRepository.findOneByUserId(body.userId);

    if (!jira) {
      jira = await jiraRepository.create(body);
    } else {
      await jiraRepository.updateById(jira.id, body);
    }

    return res.send({
      data: true,
    });
  } catch (error) {
    next(error);
  }
});

jiraRouter.post('/issues', async (req: Request, res: Response, next) => {
  try {
    const body: QueryIssueDto = queryIssueSchema.parse(req.body);
    const jira = await jiraRepository.findOneByUserId(body.userId);
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
});

export { jiraRouter };
