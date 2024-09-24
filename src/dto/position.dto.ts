import { IsNotEmpty } from 'class-validator';

export class PositionDto {
  @IsNotEmpty()
  positionId?: string;

  @IsNotEmpty()
  positionName?: string;

  salaryCoefficient?: number;

  jobDescription?: string[];

  leaveId?: string;
}
