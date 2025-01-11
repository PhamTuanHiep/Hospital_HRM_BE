import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { DepartmentEntity } from './department.entity';
import { LeaveHistoryEntity } from './leaveHistory.entity';
import { PositionEntity } from './position.entity';
import { OvertimeHistoryEntity } from './overtimeHistory.entity';
import { MedicalTrainingResultsEntity } from './medicalTrainingResults.entity';
import { NursingTrainingResultsEntity } from './nursingTrainingResults.entity';
import { UserInsuranceEntity } from './user-insurance.entity';
import { EvaluateEntity } from './evaluate.entity';
import { ContractHistoryEntity } from './contractHistory.entity';
import { SalaryHistoryEntity } from './salaryHistory.entity';
import { AnnouncementPostEntity } from './announcementPost.entity';
import { RecruitmentPostEntity } from './recruitmentPost.entity';

@Entity('users') //table name
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' }) //auto fill, increase, primary key
  userId: number;

  @Column({ type: 'varchar', length: 30, name: 'full_name' })
  fullName: string;

  @Column({ name: 'gender', default: 1 })
  gender: number;

  @Column({ type: 'varchar', length: 50, name: 'address' })
  address: string;

  @Column({
    type: 'varchar',
    length: 12,
    name: 'phone_number',
    default: '0000000000',
  })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 30, name: 'nation', default: 'Việt Nam' })
  nation: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'nationality',
    default: 'Kinh',
  })
  nationality: string;

  @Column({ type: 'varchar', length: 50, name: 'hometown', nullable: true })
  hometown: string;

  @Column({ name: 'position_id', type: 'varchar', length: 4 })
  positionId: string;

  @Column('decimal', {
    precision: 3,
    scale: 2,
    name: 'salary_coefficient',
    default: 1,
  })
  salaryCoefficient: number;

  @Column({ type: 'varchar', length: 30, name: 'birthday', default: '' })
  birthday: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'father_full_name',
    nullable: true,
  })
  fatherFullName: string;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'father_birthday',
    nullable: true,
  })
  fatherBirthday: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'mother_full_name',
    nullable: true,
  })
  motherFullName: string;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'mother_birthday',
    nullable: true,
  })
  motherBirthday: string;

  @Column({
    type: 'json',
    name: 'weekly_schedule',
    default: () => `JSON_ARRAY(2, 3, 4, 5, 6)`,
  })
  weeklySchedule: number[];

  @Column({
    type: 'json',
    name: 'job_description',
    default: () => `JSON_ARRAY('Làm việc cả tuần')`,
  })
  jobDescription: string[];

  @Column({
    type: 'varchar',
    length: 255,
    name: 'other_description',
    nullable: true,
  })
  otherDescription: string;

  @Column({ name: 'department_id', type: 'varchar', length: 4 })
  departmentId: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 30, name: 'status', nullable: true })
  status: string;

  @OneToOne(() => AccountEntity, (account) => account.user, { nullable: true })
  account: AccountEntity;

  @ManyToOne(() => PositionEntity, (position) => position.users, {
    nullable: true,
  })
  @JoinColumn({ name: 'position_id' })
  position: PositionEntity;

  @OneToMany(() => UserInsuranceEntity, (userInsurance) => userInsurance.user, {
    nullable: true,
  })
  userInsurances: UserInsuranceEntity[];

  @OneToMany(() => LeaveHistoryEntity, (leaveHistory) => leaveHistory.user, {
    nullable: true,
  })
  leaveHistories: LeaveHistoryEntity[];

  @OneToMany(
    () => OvertimeHistoryEntity,
    (overtimeHistory) => overtimeHistory.user,
    {
      nullable: true,
    },
  )
  overtimeHistories: OvertimeHistoryEntity[];

  @OneToMany(
    () => ContractHistoryEntity,
    (contractHistory) => contractHistory.user,
    {
      nullable: true,
    },
  )
  contractHistories: ContractHistoryEntity[];

  @ManyToOne(() => DepartmentEntity, (department) => department.users, {
    nullable: true,
  })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @OneToMany(
    () => MedicalTrainingResultsEntity,
    (medicalTrainingResult) => medicalTrainingResult.user,
  )
  medicalTrainingResults: MedicalTrainingResultsEntity[];

  @OneToMany(
    () => NursingTrainingResultsEntity,
    (nursingTrainingResult) => nursingTrainingResult.user,
  )
  nursingTrainingResults: NursingTrainingResultsEntity[];

  @OneToMany(() => EvaluateEntity, (evaluateHistory) => evaluateHistory.user)
  evaluateHistories: EvaluateEntity[];

  @OneToMany(() => SalaryHistoryEntity, (salaryHistory) => salaryHistory.user)
  salaryHistories: SalaryHistoryEntity[];

  @OneToMany(
    () => RecruitmentPostEntity,
    (recruitmentPost) => recruitmentPost.user,
  )
  recruitmentPosts: RecruitmentPostEntity[];

  @OneToMany(
    () => AnnouncementPostEntity,
    (announcementPost) => announcementPost.user,
  )
  announcementPosts: AnnouncementPostEntity[];
}
