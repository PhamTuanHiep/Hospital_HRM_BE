import { IsNotEmpty } from 'class-validator';

export class OvertimeHistoryDto {
  overtimeHistoryId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  overtimeId: string;

  @IsNotEmpty()
  departmentId: string;

  days: string;

  note: string;
}
