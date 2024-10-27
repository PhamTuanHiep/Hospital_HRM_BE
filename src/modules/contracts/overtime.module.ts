import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from 'src/entities/contract.entity';
import { ContractControllers } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  controllers: [ContractControllers],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
