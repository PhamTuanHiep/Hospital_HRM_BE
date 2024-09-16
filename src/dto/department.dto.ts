import { IsNotEmpty } from 'class-validator';

export class DepartmentDto {
  @IsNotEmpty()
  departmentId?: string;

  @IsNotEmpty()
  departmentName?: string;
}