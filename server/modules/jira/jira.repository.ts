import { DeepPartial, Repository } from 'typeorm';

import { AppDataSource } from '~/server/data-source';

import { JiraEntity } from './jira.entity';

class JiraRepository {
  repository: Repository<JiraEntity>;
  constructor() {
    this.repository = AppDataSource.getRepository(JiraEntity);
  }

  async findById(id: string) {
    const data = await this.repository.findOne({ where: { id } });
    return data ?? null;
  }

  async findOneByUserId(userId: string) {
    const data = await this.repository.findOne({ where: { userId } });
    return data;
  }

  async create(payload: DeepPartial<JiraEntity>) {
    return await this.repository.save(payload);
  }

  async save(jira: JiraEntity) {
    return await this.repository.save(jira);
  }

  async updateById(id: string, payload: DeepPartial<JiraEntity>) {
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

export const jiraRepository = new JiraRepository();
