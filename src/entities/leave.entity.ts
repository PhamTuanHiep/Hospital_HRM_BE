import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { LeaveHistoryEntity } from './leaveHistory.entity';

@Entity('leaves')
export class LeaveEntity extends BaseEntity {
  @PrimaryColumn({ name: 'leave_id' })
  leaveId: string;

  @Column({ type: 'varchar', length: 250, name: 'leave_types' })
  leaveTypes: string;

  @Column({ name: 'max_leave_entitlement', default: 12 })
  maxLeaveEntitlement: number;

  @OneToMany(() => LeaveHistoryEntity, (leaveHistory) => leaveHistory.leave, {
    nullable: true,
  })
  leaveHistories: LeaveHistoryEntity[];
}
