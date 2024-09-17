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

  async create(payload: DeepPartial<TicketEntity>) {
    return await this.repository.save(payload);
  }
}

export const ticketRepository = new TicketRepository();
