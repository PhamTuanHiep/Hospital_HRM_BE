import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PositionEntity } from './position.entity';
import { AllowanceEntity } from './allowance.entity';

@Entity({ name: 'position_allowance' })
export class PositionAllowanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'position_id' })
  positionId: string;

  @Column({ name: 'allowance_id' })
  allowanceId: number;

  @ManyToOne(() => PositionEntity, (position) => position.positionAllowances)
  @JoinColumn({ name: 'position_id' })
  position: PositionEntity;

  @ManyToOne(() => AllowanceEntity, (allowance) => allowance.positionAllowances)
  @JoinColumn({ name: 'allowance_id' })
  allowance: AllowanceEntity;

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
