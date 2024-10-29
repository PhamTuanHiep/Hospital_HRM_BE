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

  @Column({ type: 'varchar', length: 2, name: 'month' })
  month: string;

  @Column({ type: 'varchar', length: 4, name: 'year' })
  year: string;

  @Column({ name: 'num_of_days_off', default: 0 })
  numOfDaysOff: number;

  @Column({
    type: 'json',
    name: 'day_off_list',
    default: () => `JSON_ARRAY()`,
  })
  dayOffList: number[];

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
