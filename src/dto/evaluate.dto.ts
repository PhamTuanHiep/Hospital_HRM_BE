import { IsNotEmpty, Max, Min } from 'class-validator';

export class EvaluateDto {
  evaluateId?: number;

  @IsNotEmpty()
  userId?: number;

  @Min(1)
  @Max(5)
  workLoad?: number;

  @Min(1)
  @Max(5)
  qualityOfWork?: number;

  @Min(1)
  @Max(5)
  capacityOfWork?: number;

  quantityOfScientificWorks?: number;

  @Min(1)
  @Max(5)
  workInitiatives?: number;

  @Min(1)
  @Max(5)
  professionalEthics?: number;

  @Min(1)
  @Max(5)
  workingStyle?: number;

  @Min(1)
  @Max(5)
  responsibilityForWork?: number;

  @Min(1)
  @Max(5)
  workAttitude?: number;

  @Min(1)
  @Max(5)
  workSpirit?: number;

  @Min(1)
  @Max(5)
  workResult?: number;

  averageScore?: number;

  createdAt?: Date;

  updatedAt?: Date;
}
