import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') //table name
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' }) //auto fill, increase, primary key
  userId: number;

  @Column({ type: 'varchar', length: 250, name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', length: 1, name: 'gender' })
  gender: string;

  @Column({ type: 'varchar', length: 250, name: 'address' })
  address: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'phone_number',
    default: '0000000000',
  })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 250, name: 'nation', default: 'Việt Nam' })
  nation: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'nationality',
    default: 'Kinh',
  })
  nationality: string;

  @Column({ type: 'varchar', length: 250, name: 'hometown', default: '' })
  hometown: string;

  // @OnetoMany(() => Position, (position) => position.positionId)
  @Column({ type: 'varchar', length: 250, name: 'position_id', default: '' })
  positionId: string;

  @Column({ type: 'varchar', length: 250, name: 'birthday', default: '' })
  birthday: string;

  @Column({ type: 'varchar', length: 1000, name: 'image', default: '' })
  image: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'father_full_name',
    default: '',
  })
  fatherFullName: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'father_birthday',
    default: '',
  })
  fatherBirthday: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'mother_full_name',
    default: '',
  })
  motherFullName: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'mother_birthday',
    default: '',
  })
  motherBirthday: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'department_id',
    default: '',
  })
  departmentId: string;

  @Column({
    type: 'json',
    name: 'weekly_schedule',
    default: () => `JSON_ARRAY(2, 3, 4,5, 6)`,
  })
  weeklySchedule: number[];

  @Column({
    type: 'simple-array',
    name: 'insurance_ids',
    default: '',
  })
  insuranceIds: string[];

  @Column({
    type: 'json',
    name: 'allowance_ids',
    default: [0],
  })
  allowanceIds: number[];

  @Column({ name: 'evaluate_id', default: 1 })
  evaluateId: number;

  @Column({ type: 'varchar', length: 1000, name: 'description', default: '-' })
  description: string;

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

  @Column({ type: 'varchar', length: 250, name: 'status', default: '' })
  status: string;
}
