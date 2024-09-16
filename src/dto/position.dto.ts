import { IsNotEmpty } from 'class-validator';

export class PositionDto {
  positionId?: number;

  @IsNotEmpty()
  positionName?: string;

  salaryCoefficient?: number;

  leaveId?: string;
}
