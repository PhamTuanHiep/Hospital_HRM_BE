import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PositionAllowanceEntity } from './position-allowance.entity';

@Entity('positions')
export class PositionEntity extends BaseEntity {
  @PrimaryColumn({ name: 'position_id' })
  positionId: string;

  @Column({ type: 'varchar', length: 20, name: 'position_name' })
  positionName: string;

  @Column('decimal', {
    precision: 3,
    scale: 2,
    name: 'salary_coefficient',
    default: 1,
  })
  salaryCoefficient: number;

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

  @OneToMany(
    () => PositionAllowanceEntity,
    (positionAllowance) => positionAllowance.position,
  )
  positionAllowances: PositionAllowanceEntity[];
}
