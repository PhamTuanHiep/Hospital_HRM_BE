import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  id?: number;

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Field password must be more than 3 characters !',
  })
  @MaxLength(32, {
    message: 'Field password must be less than 32 characters !',
  })
  password?: string;

  @IsNotEmpty()
  gender?: string;

  @IsString()
  address?: string;

  @IsString()
  phoneNumber?: string;

  @IsNotEmpty()
  @IsNumber()
  roleId?: number;

  @IsNotEmpty()
  @IsNumber()
  positionId?: number;

  @IsString()
  image?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
