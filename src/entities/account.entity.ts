import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  accountId: number;

  @Column({ type: 'text', name: 'email' })
  email: string;

  @Column({ type: 'text', name: 'password' })
  password: string;

  @Column({
    type: 'text',
    name: 'avatar',
    nullable: true,
    default: null,
  })
  avatar: string;

  @Column({ name: 'role_id', type: 'varchar', length: 7 })
  roleId: string;

  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.account, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.accounts, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

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
