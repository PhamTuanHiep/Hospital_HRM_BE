import { IsNotEmpty } from 'class-validator';

export class EvaluateDto {
  evaluateId?: number;

  @IsNotEmpty()
  userId?: number;

  workLoad?: number;

  quanlityOfWork?: number;

  capacityOfWork?: number;

  quantityOfScientificWorks?: number;

  workInitiatives?: number;

  professionalEthics?: number;

  workingStyle?: number;

  responsibilityForWork?: number;

  workAttitude?: number;

  workSpirit?: number;

  workResult?: number;
}
