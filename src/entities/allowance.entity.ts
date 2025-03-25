import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AllowanceRelationshipEntity } from './allowance-relationship.entity';

@Entity('allowances')
export class AllowanceEntity extends BaseEntity {
  @PrimaryColumn({ name: 'allowance_id', type: 'varchar', length: 4 })
  allowanceId: string;

  @Column({ name: 'allowance_type', type: 'varchar', length: 2 })
  allowanceType: string;

  @Column({
    type: 'text',
    name: 'allowance_name_vi',
  })
  allowanceNameVI: string;

  @Column({
    type: 'text',
    name: 'allowance_name_en',
  })
  allowanceNameEN: string;

  @Column('decimal', {
    precision: 2, // so chu so thap phan toi da
    scale: 1, // so chu so thap phan
    name: 'allowance_rate',
    default: 0,
  })
  allowanceRate?: number;

  @Column({ name: 'allowance_fee', default: 0 })
  allowanceFee?: number;

  @Column({
    type: 'text',
    name: 'note',
    default: '',
  })
  note: string;

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
    () => AllowanceRelationshipEntity,
    (allowanceRelationship) => allowanceRelationship.allowance,
  )
  allowanceRelationships: AllowanceRelationshipEntity[];
}
