export class Allowance {
  allowanceId?: string;
  allowanceName?: string;
  allowanceFee?: number;

  constructor({ allowanceId, allowanceName, allowanceFee }) {
    if (allowanceId !== null) this.allowanceId = allowanceId;
    if (allowanceName !== null) this.allowanceName = allowanceName;
    if (allowanceFee !== null) this.allowanceFee = allowanceFee;
  }
}
