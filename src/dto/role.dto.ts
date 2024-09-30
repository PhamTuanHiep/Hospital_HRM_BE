import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  roleId?: string;

  @IsNotEmpty()
  roleName?: string;

  createdById?: number;

  updatedById?: number;

  createdAt?: Date;

  updatedAt?: Date;
}
