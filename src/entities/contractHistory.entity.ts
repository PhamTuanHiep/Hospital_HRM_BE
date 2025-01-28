import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ContractEntity } from './contract.entity';

@Entity('contract-histories')
export class ContractHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'contract_history_id' })
  contractHistoryId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'contract_id', type: 'varchar', length: 4 })
  contractId: string;

  @Column({
    type: 'varchar',
    name: 'start_day',
    length: 10,
    default: '',
    nullable: true,
  })
  startDay: string;

  @Column({
    type: 'varchar',
    name: 'end_day',
    length: 10,
    default: '',
    nullable: true,
  })
  endDay: string;

  @Column({ type: 'varchar', length: 250, name: 'note', default: '' })
  note: string;

  @Column({ name: 'status', default: 1 })
  status: number;

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
  @ManyToOne(() => UserEntity, (user) => user.contractHistories, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ContractEntity, (contract) => contract.contractHistories, {
    nullable: true,
  })
  @JoinColumn({ name: 'contract_id' })
  contract: ContractEntity;
}
