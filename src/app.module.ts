import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { RoleEntity } from './entities/role.entity';
import { RoleModule } from './modules/roles/role.module';
import { PositionEntity } from './entities/position.entity';
import { AccountModule } from './modules/accounts/account.module';
import { AccountEntity } from './entities/account.entity';
import { PositionModule } from './modules/positions/position.module';
import { DepartmentModule } from './modules/departments/department.module';
import { DepartmentEntity } from './entities/department.entity';
import { AllowanceModule } from './modules/allowances/allowance.module';
import { AllowanceEntity } from './entities/allowance.entity';
import { LeaveModule } from './modules/leaves/leave.module';
import { LeaveEntity } from './entities/leave.entity';
import { InsuranceModule } from './modules/insurances/insurance.module';
import { InsuranceEntity } from './entities/insurance.entity';
import { EvaluateModule } from './modules/evaluates/evaluate.module';
import { EvaluateEntity } from './entities/evaluate.entity';
import { OvertimeModule } from './modules/overtimes/overtime.module';
import { OvertimeEntity } from './entities/overtime.entity';
import { OvertimeHistoryModule } from './modules/overtimeHistories/overtimehistory.module';
import { OvertimeHistoryEntity } from './entities/overtimeHistory.entity';
import { MedicalTrainingResultsEntity } from './entities/medicalTrainingResults.entity';
import { NursingTrainingResultsEntity } from './entities/nursingTrainingResults.entity';
import { MedicalTrainingResultsModule } from './modules/medicalTrainingResults/medicalTrainingResults.module';
import { NursingTrainingResultsModule } from './modules/nursingTrainingResults/nursingTrainingResults.module';
import { ImageModule } from './modules/image/image.module';
import { LeaveHistoryEntity } from './entities/leaveHistory.entity';
import { LeaveHistoryModule } from './modules/leaveHistory/leaveHistory.module';
import { UserInsuranceModule } from './modules/user_insurance/user_insurance.module';
import { UserInsuranceEntity } from './entities/user-insurance.entity';
import { PositionAllowanceModule } from './modules/position-allowance/position-allowance.module';
import { PositionAllowanceEntity } from './entities/position-allowance.entity';
import { ContractEntity } from './entities/contract.entity';
import { ContractHistoryEntity } from './entities/contractHistory.entity';
import { ContractModule } from './modules/contracts/overtime.module';
import { ContractHistoryModule } from './modules/contractHistories/contractHistory.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: process.env.DB_HOST,
//       port: Number.parseInt(process.env.DB_PORT),
//       username: process.env.DB_USERNAME,
//       password: '',
//       database: process.env.DB_NAME,
//       entities: [UserEntity],
//     }),
//     UserModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'hospital_hrm',
      entities: [
        UserEntity,
        RoleEntity,
        PositionEntity,
        AccountEntity,
        DepartmentEntity,
        AllowanceEntity,
        LeaveEntity,
        UserInsuranceEntity,
        InsuranceEntity,
        EvaluateEntity,
        OvertimeEntity,
        OvertimeHistoryEntity,
        LeaveHistoryEntity,
        MedicalTrainingResultsEntity,
        NursingTrainingResultsEntity,
        PositionAllowanceEntity,
        ContractEntity,
        ContractHistoryEntity,
      ],
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    PositionModule,
    AccountModule,
    DepartmentModule,
    PositionAllowanceModule,
    AllowanceModule,
    LeaveModule,
    UserInsuranceModule,
    InsuranceModule,
    EvaluateModule,
    OvertimeModule,
    OvertimeHistoryModule,
    LeaveHistoryModule,
    MedicalTrainingResultsModule,
    NursingTrainingResultsModule,
    ImageModule,
    ContractModule,
    ContractHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log('----------------------------------');
  }
}
