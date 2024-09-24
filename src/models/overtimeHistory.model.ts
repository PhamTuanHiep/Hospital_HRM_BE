export class OvertimeHistory {
  overtimeHistoryId?: number;
  userId?: number;
  overtimeId?: string;
  departmentId?: string;
  days?: string;
  note?: string;

  constructor({
    overtimeHistoryId,
    userId,
    overtimeId,
    departmentId,
    days,
    note,
  }) {
    if (overtimeHistoryId !== null) this.overtimeHistoryId = overtimeHistoryId;
    if (userId !== null) this.userId = userId;
    if (overtimeId !== null) this.overtimeId = overtimeId;
    if (departmentId !== null) this.departmentId = departmentId;
    if (days !== null) this.days = days;
    if (note !== null) this.note = note;
  }
}
