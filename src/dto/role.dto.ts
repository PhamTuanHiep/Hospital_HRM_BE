import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  roleId?: string;

  @IsNotEmpty()
  roleName?: string;
}
