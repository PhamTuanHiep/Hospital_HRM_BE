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

@Entity('departments')
export class DepartmentEntity extends BaseEntity {
  @PrimaryColumn({ name: 'department_id' })
  departmentId: string;

  @Column({ type: 'varchar', length: 50, name: 'department_name' })
  departmentName: string;

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

  // @OneToMany(() => UserEntity, (user) => user.department)
  // users: UserEntity[];
}
