export class LeaveHistoryDto {
  leaveHistoryId: number;
  userId: number;
  leaveId: string;
  month: string;
  year: string;
  numOfDaysOff: number;
  dayOffList: number[];
  createdAt?: Date;
  updatedAt?: Date;
}
