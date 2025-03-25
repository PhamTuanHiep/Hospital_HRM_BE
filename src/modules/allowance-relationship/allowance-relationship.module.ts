import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllowanceEntity } from 'src/entities/allowance.entity';
import { PositionEntity } from 'src/entities/position.entity';
import { PositionModule } from '../positions/position.module';
import { AllowanceModule } from '../allowances/allowance.module';
import { AllowanceRelationshipEntity } from 'src/entities/allowance-relationship.entity';
import { AllowanceRelationshipControllers } from './allowance-relationship.controller';
import { AllowanceRelationshipService } from './allowance-relationship.service';
import { DepartmentEntity } from 'src/entities/department.entity';
import { DepartmentModule } from '../departments/department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AllowanceRelationshipEntity,
      PositionEntity,
      DepartmentEntity,
      AllowanceEntity,
    ]),
    DepartmentModule,
    PositionModule,
    AllowanceModule,
  ],
  controllers: [AllowanceRelationshipControllers],
  providers: [AllowanceRelationshipService],
  exports: [AllowanceRelationshipService],
})
export class AllowanceRelationshipModule {}
