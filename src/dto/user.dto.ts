import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { DepartmentEntity } from 'src/entities/department.entity';

export class UserDto {
  userId?: number;

  @IsNotEmpty()
  fullName?: string;

  @IsNotEmpty()
  gender?: string;

  @IsNotEmpty()
  address?: string;

  @IsNotEmpty()
  @Length(10, 10, {
    message: 'Field phoneNumber must be 10 characters !',
  })
  phoneNumber?: string;

  nation?: string;

  nationality?: string;

  hometown?: string;

  positionId?: string;

  birthday?: string;

  image?: string;

  fatherFullName?: string;

  fatherBirthday?: string;

  motherFullName?: string;

  motherBirthday?: string;

  departmentId?: string;

  weeklySchedule?: number[];

  insuranceIds?: string[];

  allowanceIds?: number[];

  @IsNumber()
  evaluateId?: number;

  jobDescription?: string[];

  otherDescription?: string;

  createdAt?: Date;

  updatedAt?: Date;

  status?: string;

  department?: DepartmentEntity;
}
