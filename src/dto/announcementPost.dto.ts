import { IsNotEmpty } from 'class-validator';

export class AnnouncementPostDto {
  announcementPostId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  abstract: string;

  @IsNotEmpty()
  notificationType: string;

  @IsNotEmpty()
  contentDetail: string;

  contact: string;

  image: string;
}
