import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllowanceEntity } from 'src/entities/allowance.entity';
import { AllowanceControllers } from './allowance.controller';
import { AllowanceService } from './allowance.service';

@Module({
  imports: [TypeOrmModule.forFeature([AllowanceEntity])],
  controllers: [AllowanceControllers],
  providers: [AllowanceService],
})
export class AllowanceModule {}
