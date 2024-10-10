import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserControllers } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { PositionEntity } from 'src/entities/position.entity';
import { DepartmentEntity } from 'src/entities/department.entity';
import { PositionModule } from '../positions/position.module';
import { DepartmentModule } from '../departments/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PositionEntity, DepartmentEntity]),
    PositionModule,
    DepartmentModule,
    ConfigModule,
  ],
  controllers: [UserControllers],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
