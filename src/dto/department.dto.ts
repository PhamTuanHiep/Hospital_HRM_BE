import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';

export class DepartmentDto {
  @IsNotEmpty()
  departmentId: string;

  @IsNotEmpty()
  departmentName: string;

  @IsOptional() // Không bắt buộc, có thể thêm user sau
  @IsArray()
  @IsNumber({}, { each: true }) // Đảm bảo mỗi phần tử trong mảng là số
  userIds?: number[]; // Danh sách userId thuộc về department

  users?: UserEntity[];

  createdAt?: Date;

  updatedAt?: Date;
}
