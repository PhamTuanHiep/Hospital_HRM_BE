import { IsNotEmpty } from 'class-validator';

export class PositionDto {
  @IsNotEmpty()
  positionId?: string;

  @IsNotEmpty()
  positionName?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
