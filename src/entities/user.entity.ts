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

@Entity('users') //table name
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' }) //auto fill, increase, primary key
  userId: number;

  @Column({ type: 'varchar', length: 30, name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', length: 1, name: 'gender' })
  gender: string;

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

  @Column({ type: 'varchar', length: 50, name: 'hometown', default: '' })
  hometown: string;

  @ManyToOne(() => PositionEntity, (position) => position.users, {
    nullable: true,
  })
  @JoinColumn({ name: 'position_id' })
  @Column({ type: 'varchar', length: 10 })
  position: PositionEntity;
  @Column({ type: 'varchar', length: 30, name: 'birthday', default: '' })
  birthday: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'father_full_name',
    default: '',
  })
  fatherFullName: string;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'father_birthday',
    default: '',
  })
  fatherBirthday: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'mother_full_name',
    default: '',
  })
  motherFullName: string;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'mother_birthday',
    default: '',
  })
  motherBirthday: string;

  @Column({
    type: 'json',
    name: 'weekly_schedule',
    default: () => `JSON_ARRAY(2, 3, 4,5, 6)`,
  })
  weeklySchedule: number[];

  @OneToMany(() => UserInsuranceEntity, (userInsurance) => userInsurance.user)
  userInsurances: UserInsuranceEntity[];

  @Column({ name: 'evaluate_id', default: 1 })
  evaluateId: number;

  @OneToMany(() => LeaveHistoryEntity, (leaveHistory) => leaveHistory.user, {
    nullable: true,
  })
  leaveHistories: LeaveHistoryEntity[];

  // @OneToMany(
  //   () => OvertimeHistoryEntity,
  //   (overtimeHistory) => overtimeHistory.user,
  // )
  // overtimeHistories: OvertimeHistoryEntity[];

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
    default: '-',
  })
  otherDescription: string;

  @OneToOne(() => AccountEntity, (account) => account.user)
  account: AccountEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.users, {
    nullable: true,
  })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  // @OneToMany(
  //   () => MedicalTrainingResultsEntity,
  //   (medicalTrainingResult) => medicalTrainingResult.user,
  // )
  // medicalTrainingResults: MedicalTrainingResultsEntity[];

  // @OneToMany(
  //   () => NursingTrainingResultsEntity,
  //   (nursingTrainingResult) => nursingTrainingResult.user,
  // )
  // nursingTrainingResults: NursingTrainingResultsEntity[];

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

  @Column({ type: 'varchar', length: 5, name: 'status', default: '' })
  status: string;
}
