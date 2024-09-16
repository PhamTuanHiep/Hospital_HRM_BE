import { IsNotEmpty } from 'class-validator';

export class AllowanceDto {
  @IsNotEmpty()
  allowanceId?: string;

  @IsNotEmpty()
  allowanceName?: string;

  @IsNotEmpty()
  allowanceFee?: number;
}
