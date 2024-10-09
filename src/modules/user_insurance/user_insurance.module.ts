import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInsuranceEntity } from 'src/entities/user-insurance.entity';
import { UserInsuranceControllers } from './user_insurance.controller';
import { UserInsuranceService } from './user_insurance.service';
import { UserEntity } from 'src/entities/user.entity';
import { InsuranceEntity } from 'src/entities/insurance.entity';
import { UserModule } from '../users/user.module';
import { InsuranceModule } from '../insurances/insurance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInsuranceEntity,
      UserEntity,
      InsuranceEntity,
    ]),
    UserModule,
    InsuranceModule,
  ],
  controllers: [UserInsuranceControllers],
  providers: [UserInsuranceService],
  exports: [UserInsuranceService],
})
export class UserInsuranceModule {}
