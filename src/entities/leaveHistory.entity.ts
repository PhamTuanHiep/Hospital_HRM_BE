import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column({ type: 'date', name: 'start_day' })
  startDay: string;

  @Column({ type: 'date', name: 'end_day' })
  endDay: string;

  @Column({ type: 'varchar', length: 250, name: 'note', nullable: true })
  note: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

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
}
