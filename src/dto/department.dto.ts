import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';

export class DepartmentDto {
  @IsNotEmpty()
  departmentId: string;

  @IsNotEmpty()
  departmentName: string;

  location?: string;

  funcDescription?: string;

  users?: UserEntity[];

  createdAt?: Date;

  updatedAt?: Date;
}
