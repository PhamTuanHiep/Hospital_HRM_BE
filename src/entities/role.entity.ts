import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @PrimaryColumn({ name: 'role_id' })
  roleId: string;

  @Column({ type: 'varchar', length: 250, name: 'role_name' })
  roleName: string;

  @Column({ name: 'created_by_id', default: 0 })
  createdById: number;

  @Column({ name: 'updated_by_id', default: 0 })
  updatedById: number;

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

  @OneToMany(() => AccountEntity, (account) => account.role)
  accounts: AccountEntity[];
}
