import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OvertimeHistoryEntity } from 'src/entities/overtimeHistory.entity';
import { OvertimeHistoryService } from './overtimehistory.service';
import { OvertimeHistoryControllers } from './overtimehistory.controller';
import { UserEntity } from 'src/entities/user.entity';
import { DepartmentEntity } from 'src/entities/department.entity';
import { OvertimeEntity } from 'src/entities/overtime.entity';
import { UserModule } from '../users/user.module';
import { OvertimeModule } from '../overtimes/overtime.module';
import { DepartmentModule } from '../departments/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OvertimeHistoryEntity,
      UserEntity,
      OvertimeEntity,
      DepartmentEntity,
    ]),
    UserModule,
    OvertimeModule,
    DepartmentModule,
  ],
  controllers: [OvertimeHistoryControllers],
  providers: [OvertimeHistoryService],
})
export class OvertimeHistoryModule {}
