import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OvertimeHistoryEntity } from 'src/entities/overtimeHistory.entity';
import { OvertimeHistoryService } from './overtimehistory.service';
import { OvertimeHistoryControllers } from './overtimehistory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OvertimeHistoryEntity])],
  controllers: [OvertimeHistoryControllers],
  providers: [OvertimeHistoryService],
})
export class OvertimeHistoryModule {}
