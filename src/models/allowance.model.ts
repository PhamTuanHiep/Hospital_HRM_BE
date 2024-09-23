export class Allowance {
  allowanceId: number;
  allowanceAcronym?: string;
  allowanceType?: string;
  allowanceName?: string;
  allowanceRate?: number;
  allowanceFee?: number;
  note?: string;

  constructor({
    allowanceId,
    allowanceAcronym,
    allowanceName,
    allowanceType,
    allowanceRate,
    allowanceFee,
    note,
  }) {
    if (allowanceId !== null) this.allowanceId = allowanceId;
    if (allowanceAcronym !== null) this.allowanceAcronym = allowanceAcronym;
    if (allowanceName !== null) this.allowanceName = allowanceName;
    if (allowanceType !== null) this.allowanceType = allowanceType;
    if (allowanceRate !== null) this.allowanceRate = allowanceRate;

    if (allowanceFee !== null) this.allowanceFee = allowanceFee;
    if (note !== null) this.note = note;
  }
}
