import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('salary-history')
export class SalaryHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'salary_history_id' })
  salaryHistoryId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'month' })
  month: string;

  @Column({ name: 'year' })
  year: string;

  @Column({
    type: 'decimal',
    name: 'attendance',
    precision: 3,
    scale: 1,
  })
  attendance: number;

  @Column({
    type: 'decimal',
    name: 'paid_leave',
    precision: 3,
    scale: 1,
  })
  paidLeave: number;

  @Column({
    type: 'decimal',
    name: 'unpaid_leave',
    precision: 3,
    scale: 1,
  })
  unpaidLeave: number;

  @Column({
    type: 'decimal',
    name: 'num_of_days_off',
    precision: 3,
    scale: 1,
  })
  numOfDaysOff: number;

  @Column({
    type: 'decimal',
    name: 'standard_work_days',
    precision: 3,
    scale: 1,
    nullable: true,
  })
  standardWorkDays: number;

  @Column({
    type: 'decimal',
    name: 'bonus',
    precision: 11,
    scale: 0,
    nullable: true,
  })
  bonus: number;

  @Column({
    type: 'decimal',
    name: 'allowance',
    precision: 11,
    scale: 0,
    nullable: true,
  })
  allowance: number;

  @Column({
    type: 'decimal',
    name: 'salary',
    precision: 11,
    scale: 0,
  })
  salary: number;

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

  @ManyToOne(() => UserEntity, (user) => user.salaryHistories)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
