import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalTrainingResultsEntity } from 'src/entities/medicalTrainingResults.entity';
import { MedicalTrainingResultsControllers } from './medicalTrainingResults.controller';
import { MedicalTrainingResultsService } from './medicalTrainingResults.service';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalTrainingResultsEntity, UserEntity]),
    UserModule,
  ],
  controllers: [MedicalTrainingResultsControllers],
  providers: [MedicalTrainingResultsService],
})
export class MedicalTrainingResultsModule {}
