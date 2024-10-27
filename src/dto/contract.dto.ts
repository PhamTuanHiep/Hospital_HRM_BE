import { IsNotEmpty } from 'class-validator';

export class ContractDto {
  @IsNotEmpty()
  contractId?: string;

  @IsNotEmpty()
  contractName?: string;
  note?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
