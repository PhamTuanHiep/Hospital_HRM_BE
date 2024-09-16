import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluateEntity } from 'src/entities/evaluate.entity';
import { EvaluateControllers } from './evaluate.controller';
import { EvaluateService } from './evaluate.service';

@Module({
  imports: [TypeOrmModule.forFeature([EvaluateEntity])],
  controllers: [EvaluateControllers],
  providers: [EvaluateService],
})
export class EvaluateModule {}
