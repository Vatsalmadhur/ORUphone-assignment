import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { UserVisit } from "./UserVisit.entity";

@Entity('user_session_data')
export class UserSession {
  @PrimaryColumn()
  sessionId: string;

 @Column({ type: 'varchar',default:'unknown' })
  ip: string;

  @Column({ type: 'varchar', default: 'unknown' })
  browser: string;

  @Column({ type: 'varchar', default: 'unknown' })
  location: string;

  @Column({ type: 'varchar', default: 'unknown' })
  device: string;

  @Column({ type: 'varchar',default: 'unknown' })
  os: string;

  @Column({ type: 'boolean' })
  isLoggedIn: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UserVisit, (visit) => visit.session, { cascade: true })
  visits: UserVisit[];
}

