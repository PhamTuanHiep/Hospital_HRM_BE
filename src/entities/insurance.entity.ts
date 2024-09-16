import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('insurances')
export class InsuranceEntity extends BaseEntity {
  @PrimaryColumn({ name: 'insurance_id' })
  insuranceId: string;

  @Column({ type: 'varchar', length: 250, name: 'insurance_name' })
  insuranceName: string;

  @Column({ name: 'monthly_price' })
  monthlyPrice: number;

  @Column({ name: 'price' })
  price: number;
}
