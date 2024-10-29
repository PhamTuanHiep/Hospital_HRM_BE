import { IsNotEmpty } from 'class-validator';

export class ContractDto {
  @IsNotEmpty()
  contractId: string;

  @IsNotEmpty()
  contractNameVI: string;

  @IsNotEmpty()
  contractNameEN: string;

  note?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
