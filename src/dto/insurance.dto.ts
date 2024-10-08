import { IsNotEmpty } from 'class-validator';

export class InsuranceDto {
  @IsNotEmpty()
  insuranceId?: string;

  @IsNotEmpty()
  insuranceName?: string;

  userIds?: number[];

  @IsNotEmpty()
  insuranceType?: string;

  @IsNotEmpty()
  monthlyPercentage?: number;

  note?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
