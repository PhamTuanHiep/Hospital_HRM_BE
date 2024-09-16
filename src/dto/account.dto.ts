import { IsNotEmpty } from 'class-validator';

export class AccountDto {
  accountId?: number;

  @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  password?: string;

  @IsNotEmpty()
  roleId?: string;

  @IsNotEmpty()
  userId?: number;
}
