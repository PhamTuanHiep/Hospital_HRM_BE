import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('leaves')
export class LeaveEntity extends BaseEntity {
  @PrimaryColumn({ name: 'leave_id' })
  leaveId: string;

  @Column({ type: 'varchar', length: 250, name: 'leave_types' })
  leaveTypes: string;

  @Column({ name: 'max_leave_entitlement' })
  MaxLeaveEntitlement: number;
}
