import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @PrimaryColumn({ name: 'role_id' })
  roleId: string;

  @Column({ type: 'varchar', length: 250, name: 'role_name' })
  roleName: string;
}
