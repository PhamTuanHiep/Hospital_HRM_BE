import { IsNotEmpty } from 'class-validator';

export class OvertimeHistoryDto {
  overtimeHistoryId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  overtimeId: string;

  @IsNotEmpty()
  departmentId: string;

  note?: string[];

  startDay: string;
  endDay: string;
  createdAt?: Date;
  updatedAt?: Date;
}
