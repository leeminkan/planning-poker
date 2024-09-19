import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { JiraEntityInterface } from '~/shared/jira.interface';
import type { JiraMappingFields } from '~/shared/jira.interface';

@Entity({ name: 'jira' })
export class JiraEntity implements JiraEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
  })
  host: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  token: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  enableSync: boolean;

  @Column({
    type: 'jsonb',
    default: null,
  })
  mappingFields: JiraMappingFields;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'uuid',
  })
  userId: string;
}
