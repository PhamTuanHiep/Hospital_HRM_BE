import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInsuranceEntity } from './user-insurance.entity';

@Entity('insurances')
export class InsuranceEntity extends BaseEntity {
  @PrimaryColumn({ name: 'insurance_id' })
  insuranceId: string;

  @Column({ type: 'varchar', length: 30, name: 'insurance_name' })
  insuranceName: string;

  @Column({
    type: 'varchar',
    length: 10,
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

  @OneToMany(
    () => UserInsuranceEntity,
    (userInsurance) => userInsurance.insurance,
  )
  userInsurances: UserInsuranceEntity[];

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
}
