import { IsNotEmpty } from 'class-validator';

export class AllowanceDto {
  allowanceId?: string;

  @IsNotEmpty()
  allowanceType: string;

  @IsNotEmpty()
  allowanceNameVI: string;

  @IsNotEmpty()
  allowanceNameEN: string;

  allowanceRate?: number;

  allowanceFee?: number;

  note?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
