import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OvertimeEntity } from './overtime.entity';
import { UserEntity } from './user.entity';
import { DepartmentEntity } from './department.entity';

@Entity('overtime-histories')
export class OvertimeHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'overtime_history_id' })
  overtimeHistoryId: number;

  @Column({ type: 'date', name: 'days' })
  days: string;

  @Column({ type: 'varchar', length: 250, name: 'note', default: '' })
  note: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'overtime_id' })
  overtimeId: string;

  @Column({ name: 'department_id' })
  departmentId: string;

  @ManyToOne(() => OvertimeEntity, (overtime) => overtime.overtimeHistories)
  @JoinColumn({ name: 'overtime_id' })
  @Column({ type: 'varchar', length: 10 })
  overtime: OvertimeEntity;

  @ManyToOne(() => UserEntity, (user) => user.overtimeHistories)
  @JoinColumn({ name: 'user_id' })
  @Column({ type: 'varchar', length: 5 })
  user: UserEntity;

  @ManyToOne(
    () => DepartmentEntity,
    (department) => department.overtimeHistories,
  )
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;
}
