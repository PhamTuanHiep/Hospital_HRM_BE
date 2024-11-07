import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';
import { AnnouncementPostEntity } from 'src/entities/announcementPost.entity';
import { AnnouncementPostControllers } from './announcementPost.controller';
import { AnnouncementPostService } from './announcementPost.service';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnouncementPostEntity, UserEntity]),
    UserModule,
    ImageModule,
  ],
  controllers: [AnnouncementPostControllers],
  providers: [AnnouncementPostService],
})
export class AnnouncementPostModule {}
