import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

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

  @ManyToMany(() => UserEntity, (user) => user.insurances)
  users: UserEntity[];

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
