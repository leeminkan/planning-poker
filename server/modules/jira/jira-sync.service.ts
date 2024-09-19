import { TicketEntity } from '../ticket/ticket.entity';
import { JiraHttpService } from './jira-http.service';
import { jiraRepository } from './jira.repository';
import { transformData } from './utils';

class JiraSyncServer {
  async syncTicket(ticket: TicketEntity) {
    const jira = await jiraRepository.findById(ticket.jiraId);
    if (jira && jira.enableSync) {
      const jiraHttpService = new JiraHttpService(
        jira.host,
        jira.email,
        jira.token,
      );

      const prepareFields = transformData(jira.mappingFields, ticket);

      await jiraHttpService.syncIssues(ticket.jiraIssueId, {
        fields: prepareFields,
      });
    }
  }
}

export const jiraSyncServer = new JiraSyncServer();
