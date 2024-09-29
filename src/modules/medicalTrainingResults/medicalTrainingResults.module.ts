import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalTrainingResultsEntity } from 'src/entities/medicalTrainingResults.entity';
import { MedicalTrainingResultsControllers } from './medicalTrainingResults.controller';
import { MedicalTrainingResultsService } from './medicalTrainingResults.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalTrainingResultsEntity])],
  controllers: [MedicalTrainingResultsControllers],
  providers: [MedicalTrainingResultsService],
})
export class MedicalTrainingResultsModule {}
