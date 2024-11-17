import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NursingTrainingResultsEntity } from 'src/entities/nursingTrainingResults.entity';
import { NursingTrainingResultsControllers } from './nursingTrainingResults.controller';
import { NursingTrainingResultsService } from './nursingTrainingResults.service';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NursingTrainingResultsEntity, UserEntity]),
    UserModule,
  ],
  controllers: [NursingTrainingResultsControllers],
  providers: [NursingTrainingResultsService],
})
export class NursingTrainingResultsModule {}
