import { DeepPartial, Repository } from 'typeorm';

import { AppDataSource } from '~/server/data-source';

import { SessionEntity } from './session.entity';

class SessionRepository {
  repository: Repository<SessionEntity>;
  constructor() {
    this.repository = AppDataSource.getRepository(SessionEntity);
  }

  async getRecentSessions() {
    const data = await this.repository.find({
      take: 5,
      order: {
        createdAt: 'DESC',
      },
    });
    return data;
  }

  async findById(id: string) {
    const data = await this.repository.findOne({ where: { id } });
    return data ?? null;
  }

  async create(payload: DeepPartial<SessionEntity>) {
    return await this.repository.save(payload);
  }

  async save(ticket: SessionEntity) {
    return await this.repository.save(ticket);
  }
}

export const sessionRepository = new SessionRepository();
