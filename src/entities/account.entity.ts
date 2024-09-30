import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  accountId: number;

  @Column({ type: 'varchar', length: 250, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 1000, name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 250, name: 'role_id', default: 'user' })
  roleId: string;

  @Column({ name: 'user_id' })
  userId: number;

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
}
