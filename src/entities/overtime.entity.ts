import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { OvertimeHistoryEntity } from './overtimeHistory.entity';

@Entity('overtimes')
export class OvertimeEntity extends BaseEntity {
  @PrimaryColumn({ name: 'overtime_id' })
  overtimeId: string;

  @Column({ type: 'varchar', length: 250, name: 'overtime_name' })
  overtimeName: string;

  @Column({ name: 'overtime_pay' })
  overtimePay: number;

  @Column({
    type: 'json',
    name: 'note',
    default: () => `JSON_ARRAY('Ca trực buổi tối')`,
  })
  note: string[];

  @OneToMany(
    () => OvertimeHistoryEntity,
    (overtimeHistory) => overtimeHistory.overtime,
  )
  overtimeHistories: OvertimeHistoryEntity[];
}
