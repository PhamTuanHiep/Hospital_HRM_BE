export class LeaveHistoryDto {
  leaveHistoryId: number;
  userId: number;
  leaveId: string;
  startDay: string;
  endDay: string;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
