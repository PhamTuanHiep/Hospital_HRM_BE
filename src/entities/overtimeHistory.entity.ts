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
import { OvertimeEntity } from './overtime.entity';
import { UserEntity } from './user.entity';
import { DepartmentEntity } from './department.entity';

@Entity('overtime-histories')
export class OvertimeHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'overtime_history_id' })
  overtimeHistoryId: number;
  @Column({
    type: 'json',
    name: 'note',
    default: () =>
      `JSON_ARRAY('Trực thông thường, không phải tình huống khẩn cấp')`,
  })
  note: string[];

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'overtime_id', type: 'varchar', length: 5 })
  overtimeId: string;

  @Column({ name: 'department_id', type: 'varchar', length: 4 })
  departmentId: string;

  @Column({ type: 'varchar', name: 'start_day', length: 10 })
  startDay: string;

  @Column({ type: 'varchar', name: 'end_day', length: 10 })
  endDay: string;

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

  @ManyToOne(() => OvertimeEntity, (overtime) => overtime.overtimeHistories, {
    nullable: true,
  })
  @JoinColumn({ name: 'overtime_id' })
  overtime: OvertimeEntity;

  @ManyToOne(() => UserEntity, (user) => user.overtimeHistories, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => DepartmentEntity,
    (department) => department.overtimeHistories,
    { nullable: true },
  )
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;
}
