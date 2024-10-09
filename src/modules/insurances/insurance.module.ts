import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceEntity } from 'src/entities/insurance.entity';
import { InsuranceControllers } from './insurance.controller';
import { InsuranceService } from './insurance.service';

@Module({
  imports: [TypeOrmModule.forFeature([InsuranceEntity])],
  controllers: [InsuranceControllers],
  providers: [InsuranceService],
  exports: [InsuranceService],
})
export class InsuranceModule {}
