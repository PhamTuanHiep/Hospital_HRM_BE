import { IsNotEmpty } from 'class-validator';

export class InsuranceDto {
  @IsNotEmpty()
  insuranceId?: string;

  @IsNotEmpty()
  insuranceName?: string;

  @IsNotEmpty()
  monthlyPrice?: number;

  @IsNotEmpty()
  price?: number;
}
