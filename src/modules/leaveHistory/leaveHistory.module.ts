import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveHistoryEntity } from 'src/entities/leaveHistory.entity';
import { LeaveHistoryControllers } from './leaveHistory.controller';
import { LeaveHistoryService } from './leaveHistory.service';
import { LeaveEntity } from 'src/entities/leave.entity';
import { UserEntity } from 'src/entities/user.entity';
import { LeaveModule } from '../leaves/leave.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveHistoryEntity, LeaveEntity, UserEntity]),
    LeaveModule,
    UserModule,
  ],
  controllers: [LeaveHistoryControllers],
  providers: [LeaveHistoryService],
})
export class LeaveHistoryModule {}
