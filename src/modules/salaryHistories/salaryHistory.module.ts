import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';
import { SalaryHistoryEntity } from 'src/entities/salaryHistory.entity';
import { SalaryHistoryControllers } from './salaryHistory.controller';
import { SalaryHistoryService } from './salaryHistory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalaryHistoryEntity, UserEntity]),
    UserModule,
  ],
  controllers: [SalaryHistoryControllers],
  providers: [SalaryHistoryService],
})
export class SalaryHistoryModule {}
