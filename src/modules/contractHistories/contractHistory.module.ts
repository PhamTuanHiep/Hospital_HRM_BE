import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';
import { ContractEntity } from 'src/entities/contract.entity';
import { ContractModule } from '../contracts/overtime.module';
import { ContractHistoryEntity } from 'src/entities/contractHistory.entity';
import { ContractHistoryService } from './contractHistory.service';
import { ContractHistoryControllers } from './contractHistory.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContractHistoryEntity,
      UserEntity,
      ContractEntity,
    ]),
    UserModule,
    ContractModule,
  ],
  controllers: [ContractHistoryControllers],
  providers: [ContractHistoryService],
})
export class ContractHistoryModule {}
