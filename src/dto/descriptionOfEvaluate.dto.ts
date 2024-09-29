import { IsNotEmpty } from 'class-validator';

export class DescriptionEvaluateDto {
  descriptionEvaluateId?: number;

  @IsNotEmpty()
  descriptionEvaluateEnglish: string;

  @IsNotEmpty()
  descriptionEvaluateVietNamese: string;

  note?: string;
}
