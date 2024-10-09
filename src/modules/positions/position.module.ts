import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from 'src/entities/position.entity';
import { PositionControllers } from './position.controller';
import { PositionService } from './position.service';

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  controllers: [PositionControllers],
  providers: [PositionService],
  exports: [PositionService],
})
export class PositionModule {}
