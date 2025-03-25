import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContractHistoryEntity } from './contractHistory.entity';

@Entity('contracts')
export class ContractEntity extends BaseEntity {
  @PrimaryColumn({ name: 'contract_id', type: 'varchar', length: 4 })
  contractId: string;

  @Column({ type: 'text', name: 'contract_name_vi' })
  contractNameVI: string;

  @Column({ type: 'text', name: 'contract_name_en' })
  contractNameEN: string;

  @Column({
    type: 'json',
    name: 'note',
    default: () =>
      `JSON_ARRAY('Mỗi nhân viên chính thức đều cần kí 1 loại hợp đồng tương ứng')`,
  })
  note: string[];

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

  @OneToMany(
    () => ContractHistoryEntity,
    (contractHistory) => contractHistory.contract,
    { nullable: true },
  )
  contractHistories: ContractHistoryEntity[];
}
