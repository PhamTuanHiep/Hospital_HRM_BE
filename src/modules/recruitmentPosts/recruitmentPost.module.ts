import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';
import { RecruitmentPostEntity } from 'src/entities/recruitmentPost.entity';
import { RecruitmentPostControllers } from './recruitmentPost.controller';
import { RecruitmentPostService } from './recruitmentPost.service';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecruitmentPostEntity, UserEntity]),
    UserModule,
    ImageModule,
  ],
  controllers: [RecruitmentPostControllers],
  providers: [RecruitmentPostService],
})
export class RecruitmentPostModule {}
