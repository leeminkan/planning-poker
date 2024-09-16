import { dirname, join } from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { fileURLToPath } from 'url';

import { databaseConfig } from './configs';
import { SessionEntity } from './modules/session/session.entity';
import { TicketEntity } from './modules/ticket/ticket.entity';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: parseInt(databaseConfig.port || '5432'),
  username: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
  logging: true,
  entities: [SessionEntity, TicketEntity],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [join(__dirname, 'migrations/**/*{.ts,.js}')],
});
