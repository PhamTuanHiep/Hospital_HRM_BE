import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AccountDto {
  accountId?: number;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  avatar?: string;

  roleId?: string;

  userId?: number;

  createdAt?: Date;

  updatedAt?: Date;
}
