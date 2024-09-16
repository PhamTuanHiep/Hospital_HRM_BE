export class Insurance {
  insuranceId?: string;
  insuranceName?: string;
  monthlyPrice?: number;
  price?: number;

  constructor({ insuranceId, insuranceName, monthlyPrice, price }) {
    if (insuranceId !== null) this.insuranceId = insuranceId;
    if (insuranceName !== null) this.insuranceName = insuranceName;
    if (monthlyPrice !== null) this.monthlyPrice = monthlyPrice;
    if (price !== null) this.price = price;
  }
}
