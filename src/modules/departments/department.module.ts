import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/entities/department.entity';
import { DepartmentControllers } from './department.controller';
import { DepartmentService } from './department.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentControllers],
  providers: [DepartmentService],
})
export class DepartmentModule {}
