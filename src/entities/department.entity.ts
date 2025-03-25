import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OvertimeHistoryEntity } from './overtimeHistory.entity';
import { AllowanceRelationshipEntity } from './allowance-relationship.entity';

@Entity('departments')
export class DepartmentEntity extends BaseEntity {
  @PrimaryColumn({ name: 'department_id', type: 'varchar', length: 4 })
  departmentId: string;

  @Column({ type: 'text', name: 'department_name' })
  departmentName: string;

  @Column({ type: 'text', name: 'location', nullable: true })
  location: string;

  @Column({
    type: 'text',
    name: 'func_description',
    nullable: true,
  })
  funcDescription: string;

  @OneToMany(() => UserEntity, (user) => user.department, { nullable: true })
  users: UserEntity[];

  @OneToMany(
    () => OvertimeHistoryEntity,
    (overtimeHistory) => overtimeHistory.department,
    { nullable: true },
  )
  overtimeHistories: OvertimeHistoryEntity[];

  @OneToOne(
    () => AllowanceRelationshipEntity,
    (allowanceRelationship) => allowanceRelationship.department,
    { nullable: true },
  )
  allowanceRelationship: AllowanceRelationshipEntity;

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
