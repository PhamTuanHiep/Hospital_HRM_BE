import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveEntity } from 'src/entities/leave.entity';
import { LeaveControllers } from './leave.controller';
import { LeaveService } from './leave.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveEntity])],
  controllers: [LeaveControllers],
  providers: [LeaveService],
  exports: [LeaveService],
})
export class LeaveModule {}
