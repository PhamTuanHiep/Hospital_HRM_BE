import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('departments')
export class DepartmentEntity extends BaseEntity {
  @PrimaryColumn({ name: 'department_id' })
  departmentId: string;

  @Column({ type: 'varchar', length: 250, name: 'department_name' })
  departmentName: string;
}
