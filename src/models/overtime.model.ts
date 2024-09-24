export class Overtime {
  overtimeId?: string;

  overtimeName?: string;

  overtimePay?: number;

  note?: string[];

  constructor({ overtimeId, overtimeName, overtimePay, note }) {
    if (overtimeId !== null) this.overtimeId = overtimeId;
    if (overtimeName !== null) this.overtimeName = overtimeName;
    if (overtimePay !== null) this.overtimePay = overtimePay;
    if (note !== null) this.note = note;
  }
}
