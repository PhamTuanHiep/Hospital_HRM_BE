import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('allowances')
export class AllowanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'allowance_id' })
  allowanceId: number;

  @Column({ type: 'varchar', length: 250, name: 'allowance_acronym' })
  allowanceAcronym: string;
  @Column({
    type: 'varchar',
    length: 250,
    name: 'allowance_type',
  })
  allowanceType: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'allowance_name',
  })
  allowanceName: string;

  @Column('decimal', {
    precision: 2, // so chu so thap phan toi da
    scale: 1, // so chu so thap phan
    name: 'allowance_rate',
    default: 0,
  })
  allowanceRate: number;

  @Column({ name: 'allowance_fee', default: 0 })
  allowanceFee?: number;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'note',
    default: '',
  })
  note: string;
}
