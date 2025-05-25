import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { UserVisit } from "./UserVisit.entity";

@Entity('visit_actions')
export class VisitAction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserVisit, (visit) => visit.actions, { onDelete: 'CASCADE' })
  visit: UserVisit;


  @Column({ type: 'varchar', nullable: true })
  element: string;


  @CreateDateColumn()
  createdAt: Date;
}

