import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('allowances')
export class AllowanceEntity extends BaseEntity {
  @PrimaryColumn({ name: 'allowance_id' })
  allowanceId: string;

  @Column({ type: 'varchar', length: 250, name: 'allowance_name' })
  allowanceName: string;

  @Column({ name: 'allowance_fee' })
  allowanceFee: number;
}
