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
import { AllowanceRelationshipEntity } from './allowance-relationship.entity';

@Entity('positions')
export class PositionEntity extends BaseEntity {
  @PrimaryColumn({ name: 'position_id', type: 'varchar', length: 4 })
  positionId: string;

  @Column({ type: 'text', name: 'position_name' })
  positionName: string;

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

  @OneToMany(() => UserEntity, (user) => user.position)
  users: UserEntity[];

  @OneToOne(
    () => AllowanceRelationshipEntity,
    (allowanceRelationship) => allowanceRelationship.position,
    { nullable: true },
  )
  allowanceRelationship: AllowanceRelationshipEntity;
}
