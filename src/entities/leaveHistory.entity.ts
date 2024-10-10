import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { LeaveEntity } from './leave.entity';

@Entity('leave-histories')
export class LeaveHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'leave_history_id' }) //auto fill, increase, primary key
  leaveHistoryId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'leave_id' })
  leaveId: string;

  @ManyToOne(() => UserEntity, (user) => user.leaveHistories, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => LeaveEntity, (leave) => leave.leaveHistories, {
    nullable: true,
  })
  @JoinColumn({ name: 'leave_id' })
  leave: LeaveEntity;

  @Column({ type: 'date', name: 'start_day' })
  startDay: string;

  @Column({ type: 'date', name: 'end_day' })
  endDay: string;

  @Column({ type: 'varchar', length: 250, name: 'note', nullable: true })
  note: string;
}
