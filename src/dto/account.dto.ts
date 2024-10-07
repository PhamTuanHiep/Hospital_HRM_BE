import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';

export class AccountDto {
  accountId?: number;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password?: string;

  avatar?: string;

  @IsNotEmpty()
  roleId?: string;

  @IsNotEmpty()
  userId?: number;

  user?: UserEntity;

  role?: RoleEntity;

  createdById?: number;

  createdBy?: UserEntity;

  updatedById?: number;

  updatedBy?: UserEntity;

  createdAt?: Date;

  updatedAt?: Date;
}
