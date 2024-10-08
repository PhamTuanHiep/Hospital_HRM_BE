import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';

export class AccountDto {
  accountId?: number;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  avatar?: string;

  @IsNotEmpty()
  roleId?: string;

  userId?: number;

  user?: UserEntity;

  role?: RoleEntity;

  createdAt?: Date;

  updatedAt?: Date;
}
