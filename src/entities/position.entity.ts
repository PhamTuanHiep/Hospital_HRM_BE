import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('positions')
export class PositionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  positionId: number;

  @Column({ type: 'varchar', length: 250, name: 'position_name' })
  positionName: string;

  @Column('decimal', { precision: 3, scale: 2, name: 'salary_coefficient' })
  salaryCoefficient: number;

  @Column({ type: 'varchar', length: 250, name: 'leave_id' })
  leaveId: string;
}
