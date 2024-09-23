import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('insurances')
export class InsuranceEntity extends BaseEntity {
  @PrimaryColumn({ name: 'insurance_id' })
  insuranceId: string;

  @Column({ type: 'varchar', length: 250, name: 'insurance_name' })
  insuranceName: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'insurance_type',
    default: 'E',
  })
  insuranceType: string;

  @Column('decimal', {
    precision: 2, // so chu so thap phan toi da
    scale: 1, // so chu so thap phan
    name: 'monthly_percentage',
    default: 0,
  })
  monthlyPercentage: number;

  @Column({ name: 'note', default: '-' })
  note: string;
}
