import { DeepPartial, Repository } from 'typeorm';

import { AppDataSource } from '~/server/data-source';

import { TicketEntity } from './ticket.entity';

class TicketRepository {
  repository: Repository<TicketEntity>;
  constructor() {
    this.repository = AppDataSource.getRepository(TicketEntity);
  }

  async findById(id: string) {
    const data = await this.repository.findOne({ where: { id } });
    return data ?? null;
  }

  async findAllBySessionId(sessionId: string) {
    const data = await this.repository.find({ where: { sessionId } });
    return data;
  }

  async findBySessionAndJira({
    sessionId,
    jiraId,
    jiraIssueId,
  }: {
    sessionId: string;
    jiraId: string;
    jiraIssueId: string;
  }) {
    const data = await this.repository.findOne({
      where: { sessionId, jiraId, jiraIssueId },
    });
    return data;
  }

  async create(payload: DeepPartial<TicketEntity>) {
    return await this.repository.save(payload);
  }

  async save(ticket: TicketEntity) {
    return await this.repository.save(ticket);
  }

  async updateById(id: string, payload: DeepPartial<TicketEntity>) {
    return await this.repository.update(
      {
        id,
      },
      payload,
    );
  }

  async removeById(id: string) {
    return await this.repository.delete({
      id,
    });
  }
}

export const ticketRepository = new TicketRepository();
