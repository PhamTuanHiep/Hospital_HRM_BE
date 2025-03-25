import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PositionEntity } from './position.entity';
import { AllowanceEntity } from './allowance.entity';

import { DepartmentEntity } from './department.entity';

@Entity({ name: 'allowance-relationships' })
export class AllowanceRelationshipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'position_id', type: 'varchar', length: 4, nullable: true })
  positionId: string;

  @Column({ name: 'department_id', type: 'varchar', length: 4, nullable: true })
  departmentId: string;

  @Column({ name: 'allowance_id', type: 'varchar', length: 4 })
  allowanceId: string;

  @OneToOne(
    () => PositionEntity,
    (position) => position.allowanceRelationship,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'position_id' })
  position: PositionEntity;

  @OneToOne(
    () => DepartmentEntity,
    (department) => department.allowanceRelationship,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @ManyToOne(
    () => AllowanceEntity,
    (allowance) => allowance.allowanceRelationships,
  )
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
