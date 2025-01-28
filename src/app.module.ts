import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserModule } from './modules/users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { ContractModule } from './modules/contracts/contract.module';
import { ContractHistoryModule } from './modules/contractHistories/contractHistory.module';
import { SalaryHistoryModule } from './modules/salaryHistories/salaryHistory.module';
import { SalaryHistoryEntity } from './entities/salaryHistory.entity';
import { RecruitmentPostModule } from './modules/recruitmentPosts/recruitmentPost.module';
import { RecruitmentPostEntity } from './entities/recruitmentPost.entity';
import { AnnouncementPostModule } from './modules/announcementPosts/announcementPost.module';
import { AnnouncementPostEntity } from './entities/announcementPost.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Tự động load biến môi trường trong toàn bộ ứng dụng
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as
          | 'postgres'
          | 'mysql'
          | 'sqlite', // Hoặc 'postgres', 'sqlite', tùy DB bạn dùng
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER_NAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
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
          SalaryHistoryEntity,
          RecruitmentPostEntity,
          AnnouncementPostEntity,
        ],
        synchronize: true, // Không khuyến nghị bật trong môi trường production
      }),
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
    SalaryHistoryModule,
    RecruitmentPostModule,
    AnnouncementPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log('----------------------------------');
  }
}
