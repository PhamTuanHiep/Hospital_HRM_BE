import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/entities/department.entity';
import { DepartmentControllers } from './department.controller';
import { DepartmentService } from './department.service';
import { UserModule } from '../users/user.module';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity, UserEntity]),
    UserModule,
  ],
  controllers: [DepartmentControllers],
  providers: [DepartmentService],
})
export class DepartmentModule {}
