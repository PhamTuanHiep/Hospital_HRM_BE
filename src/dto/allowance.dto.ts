import { IsNotEmpty } from 'class-validator';

export class AllowanceDto {
  allowanceId?: number;

  @IsNotEmpty()
  allowanceAcronym?: string;

  @IsNotEmpty()
  allowanceType?: string;

  @IsNotEmpty()
  allowanceName?: string;

  allowanceRate?: number;

  allowanceFee?: number;

  note?: string;
}
