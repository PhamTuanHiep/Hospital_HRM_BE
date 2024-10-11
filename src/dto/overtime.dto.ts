import { IsNotEmpty } from 'class-validator';

export class OvertimeDto {
  @IsNotEmpty()
  overtimeId?: string;

  @IsNotEmpty()
  overtimeName?: string;

  overtimePay?: number;

  note?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
