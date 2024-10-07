import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
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

  @Column({ type: 'varchar', length: 30, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 250, name: 'password' })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'avatar',
    nullable: true,
    default: null,
  })
  avatar: string;

  @OneToOne(() => UserEntity, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.accounts)
  @JoinColumn({ name: 'role_id' })
  @Column({ type: 'varchar', length: 7 })
  role: RoleEntity;

  @ManyToOne(() => UserEntity, (user) => user.createdAccounts, {
    nullable: true,
  })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.updatedAccounts, {
    nullable: true,
  })
  updatedBy: UserEntity;

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
