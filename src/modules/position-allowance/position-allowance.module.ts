import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllowanceEntity } from 'src/entities/allowance.entity';
import { PositionAllowanceEntity } from 'src/entities/position-allowance.entity';
import { PositionEntity } from 'src/entities/position.entity';
import { PositionModule } from '../positions/position.module';
import { AllowanceModule } from '../allowances/allowance.module';
import { PositionAllowanceControllers } from './position-allowance.controller';
import { PositionAllowanceService } from './position-allowance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PositionAllowanceEntity,
      PositionEntity,
      AllowanceEntity,
    ]),

    PositionModule,
    AllowanceModule,
  ],
  controllers: [PositionAllowanceControllers],
  providers: [PositionAllowanceService],
  exports: [PositionAllowanceService],
})
export class PositionAllowanceModule {}
