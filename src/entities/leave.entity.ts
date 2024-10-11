import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LeaveHistoryEntity } from './leaveHistory.entity';

@Entity('leaves')
export class LeaveEntity extends BaseEntity {
  @PrimaryColumn({ name: 'leave_id' })
  leaveId: string;

  @Column({ type: 'varchar', length: 20, name: 'leave_types' })
  leaveTypes: string;

  @Column({ name: 'max_leave_entitlement', default: 12 })
  maxLeaveEntitlement: number;

  @Column({ type: 'varchar', length: 20, name: 'unit', nullable: true })
  unit: string;

  @OneToMany(() => LeaveHistoryEntity, (leaveHistory) => leaveHistory.leave, {
    nullable: true,
  })
  leaveHistories: LeaveHistoryEntity[];

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
