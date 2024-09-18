import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SessionEntityInterface } from '~/shared/session-state.interface';

import { TicketEntity } from '../ticket/ticket.entity';

@Entity({ name: 'sessions' })
export class SessionEntity implements SessionEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TicketEntity, (ticket) => ticket.session)
  tickets: TicketEntity[];
}
