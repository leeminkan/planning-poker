import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { SessionEntity } from "../session/session.entity";

@Entity({ name: "tickets" })
export class TicketEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
  })
  title: string;

  @Column({
    type: "varchar",
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: "uuid",
  })
  sessionId: string;

  @ManyToOne(() => SessionEntity, (session) => session.tickets)
  @JoinColumn({ name: "session_id" })
  session: SessionEntity;
}
