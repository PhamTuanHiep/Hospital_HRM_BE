import { IsNotEmpty } from 'class-validator';

export class RecruitmentPostDto {
  recruitmentPostId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subtitle: string;

  @IsNotEmpty()
  generalRequirements: string;

  @IsNotEmpty()
  benefits: string;

  @IsNotEmpty()
  requiredDocuments: string;

  @IsNotEmpty()
  contact: string;

  image: string;
}
