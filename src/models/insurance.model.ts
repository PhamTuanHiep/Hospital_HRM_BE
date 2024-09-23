export class Insurance {
  insuranceId?: string;
  insuranceName?: string;
  insuranceType?: string;
  monthlyPercentage?: number;
  note?: string;

  constructor({
    insuranceId,
    insuranceName,
    insuranceType,
    monthlyPercentage,
    note,
  }) {
    if (insuranceId !== null) this.insuranceId = insuranceId;
    if (insuranceName !== null) this.insuranceName = insuranceName;
    if (insuranceType !== null) this.insuranceType = insuranceType;

    if (monthlyPercentage !== null) this.monthlyPercentage = monthlyPercentage;
    if (note !== null) this.note = note;
  }
}
