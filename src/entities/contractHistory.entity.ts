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

  @Column({ name: 'contract_id', length: 5 })
  contractId: string;

  @Column({ type: 'date', name: 'start_day' })
  startDay: string;

  @Column({ type: 'date', name: 'end_day' })
  endDay: string;

  @Column({ type: 'varchar', length: 250, name: 'note', default: '' })
  note: string;

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
