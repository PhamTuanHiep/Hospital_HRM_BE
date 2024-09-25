import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('positions')
export class PositionEntity extends BaseEntity {
  @PrimaryColumn({ name: 'position_id' })
  positionId: string;

  @Column({ type: 'varchar', length: 250, name: 'position_name' })
  positionName: string;

  @Column('decimal', {
    precision: 3,
    scale: 2,
    name: 'salary_coefficient',
    default: 1,
  })
  salaryCoefficient: number;

  @Column({ type: 'varchar', length: 250, name: 'leave_id', default: '2' })
  leaveId: string;
}
