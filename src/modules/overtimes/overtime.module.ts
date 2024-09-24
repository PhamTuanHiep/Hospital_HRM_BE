import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OvertimeControllers } from './overtime.controller';
import { OvertimeService } from './overtime.service';
import { OvertimeEntity } from 'src/entities/overtime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OvertimeEntity])],
  controllers: [OvertimeControllers],
  providers: [OvertimeService],
})
export class OvertimeModule {}
