import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OvertimeHistoryEntity } from './overtimeHistory.entity';

@Entity('overtimes')
export class OvertimeEntity extends BaseEntity {
  @PrimaryColumn({ name: 'overtime_id', type: 'varchar', length: 5 })
  overtimeId: string;

  @Column({ type: 'varchar', length: 40, name: 'overtime_name' })
  overtimeName: string;

  @Column({ name: 'overtime_pay' })
  overtimePay: number;

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

  @OneToMany(
    () => OvertimeHistoryEntity,
    (overtimeHistory) => overtimeHistory.overtime,
  )
  overtimeHistories: OvertimeHistoryEntity[];
}
