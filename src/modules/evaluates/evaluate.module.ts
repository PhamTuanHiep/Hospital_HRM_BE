import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluateEntity } from 'src/entities/evaluate.entity';
import { EvaluateControllers } from './evaluate.controller';
import { EvaluateService } from './evaluate.service';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluateEntity, UserEntity]), UserModule],
  controllers: [EvaluateControllers],
  providers: [EvaluateService],
})
export class EvaluateModule {}
