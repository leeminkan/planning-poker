import { DeepPartial, Repository } from "typeorm";

import { AppDataSource } from "~/server/data-source";
import { SessionEntity } from "./session.entity";

class SessionRepository {
  repository: Repository<SessionEntity>;
  constructor() {
    this.repository = AppDataSource.getRepository(SessionEntity);
  }

  async findById(id: string) {
    const data = await this.repository.findOne({ where: { id } });
    return data ?? null;
  }

  async create(payload: DeepPartial<SessionEntity>) {
    return await this.repository.save(payload);
  }
}

export const sessionRepository = new SessionRepository();
