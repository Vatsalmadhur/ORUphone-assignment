import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { UserSession } from "./UserSession.entity";
import { VisitAction } from "./VisitAction.entity";

@Entity('user_visits')
export class UserVisit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserSession, (session) => session.visits, { onDelete: 'CASCADE' })
  session: UserSession;

  @Column({ type: 'text' })
  pageUrl: string;

  @Column({ type: 'int' })
  timeSpent: number; // Time spent in seconds
  
  @Column({ type: 'int', nullable: true })
  scrollDepth: number; // Percentage of page scrolled

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => VisitAction, (action) => action.visit, { cascade: true })
  actions: VisitAction[];
}

