export class DescriptionEvaluate {
  descriptionEvaluateId?: number;
  descriptionEvaluateEnglish?: string;
  descriptionEvaluateVietNamese?: string;
  note?: string;

  constructor({
    descriptionEvaluateId,
    descriptionEvaluateEnglish,
    descriptionEvaluateVietNamese,
    note,
  }) {
    if (descriptionEvaluateId !== null)
      this.descriptionEvaluateId = descriptionEvaluateId;
    if (descriptionEvaluateEnglish !== null)
      this.descriptionEvaluateEnglish = descriptionEvaluateEnglish;
    if (descriptionEvaluateVietNamese !== null)
      this.descriptionEvaluateVietNamese = descriptionEvaluateVietNamese;
    if (note !== null) this.note = note;
  }
}
