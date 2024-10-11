import { IsNotEmpty } from 'class-validator';

export class LeaveDto {
  @IsNotEmpty()
  leaveId: string;

  @IsNotEmpty()
  leaveTypes: string;

  @IsNotEmpty()
  maxLeaveEntitlement: number;

  unit: string;

  createdAt?: Date;
  updatedAt?: Date;
}
