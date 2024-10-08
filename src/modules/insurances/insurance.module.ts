import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceEntity } from 'src/entities/insurance.entity';
import { InsuranceControllers } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InsuranceEntity, UserEntity]),
    UserModule,
  ],
  controllers: [InsuranceControllers],
  providers: [InsuranceService],
})
export class InsuranceModule {}
