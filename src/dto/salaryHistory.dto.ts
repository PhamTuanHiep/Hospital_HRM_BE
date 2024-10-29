import { IsNotEmpty } from 'class-validator';

export class SalaryHistoryDto {
  salaryHistoryId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  month: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  attendance: number;

  @IsNotEmpty()
  paidLeave: number;

  @IsNotEmpty()
  unpaidLeave: number;

  @IsNotEmpty()
  numOfDaysOff: number;

  standardWorkDays: number;

  bonus: number;

  allowance: number;

  @IsNotEmpty()
  salary: number;
}
