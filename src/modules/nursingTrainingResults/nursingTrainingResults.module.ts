import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NursingTrainingResultsEntity } from 'src/entities/nursingTrainingResults.entity';
import { NursingTrainingResultsControllers } from './nursingTrainingResults.controller';
import { NursingTrainingResultsService } from './nursingTrainingResults.service';

@Module({
  imports: [TypeOrmModule.forFeature([NursingTrainingResultsEntity])],
  controllers: [NursingTrainingResultsControllers],
  providers: [NursingTrainingResultsService],
})
export class NursingTrainingResultsModule {}
