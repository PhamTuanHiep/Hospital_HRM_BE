import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('overtime-histories')
export class OvertimeHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'overtime_history_id' })
  overtimeHistoryId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 250, name: 'overtime_id' })
  overtimeId: string;

  @Column({ type: 'varchar', length: 250, name: 'department_id' })
  departmentId: string;

  @Column({ type: 'varchar', length: 250, name: 'days', default: '' })
  days: string;

  @Column({ type: 'varchar', length: 250, name: 'note', default: '' })
  note: string;
}
