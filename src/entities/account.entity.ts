import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  accountId: number;

  @Column({ type: 'varchar', length: 250, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 1000, name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 250, name: 'role_id' })
  roleId: string;

  @Column({ name: 'user_id' })
  userId: number;
}
