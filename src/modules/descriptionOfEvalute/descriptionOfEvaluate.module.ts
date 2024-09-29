import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionEvaluateEntity } from 'src/entities/descriptionOfEvaluate.entity';
import { DescriptionEvaluateControllers } from './descriptionOfEvaluate.controller';
import { DescriptionEvaluateService } from './descriptionOfEvaluate.service';

@Module({
  imports: [TypeOrmModule.forFeature([DescriptionEvaluateEntity])],
  controllers: [DescriptionEvaluateControllers],
  providers: [DescriptionEvaluateService],
})
export class DescriptionEvaluateModule {}
