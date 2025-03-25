import { IsNotEmpty } from 'class-validator';

export class ContractHistoryDto {
  contractHistoryId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  contractId: string;

  startDay?: string;
  endDay?: string;
  note?: string;
  suspensionTime?: number;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
