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

  @Column({ type: 'varchar', length: 250, name: 'phone_number' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 250, name: 'nation' })
  nation: string;

  @Column({ type: 'varchar', length: 250, name: 'nationality' })
  nationality: string;

  @Column({ type: 'varchar', length: 250, name: 'hometown' })
  hometown: string;

  // @OnetoMany(() => Position, (position) => position.positionId)
  @Column({ type: 'varchar', length: 250, name: 'position_id' })
  positionId: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'birthday',
  })
  birthday: string;

  @Column({ type: 'varchar', length: 1000, name: 'image' })
  image: string;

  @Column({ type: 'varchar', length: 250, name: 'father_full_name' })
  fatherFullName: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'father_birthday',
  })
  fatherBirthday: string;

  @Column({ type: 'varchar', length: 250, name: 'mother_full_name' })
  motherFullName: string;

  @Column({ type: 'varchar', length: 250, name: 'mother_birthday' })
  motherBirthday: string;

  @Column({ type: 'varchar', length: 250, name: 'department_id' })
  departmentId: string;

  @Column({ type: 'varchar', length: 250, name: 'insurance_id' })
  insuranceId: string;

  @Column({ name: 'evaluate_id' })
  evaluateId: number;

  @Column({ type: 'varchar', length: 1000, name: 'description' })
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

  @Column({ type: 'varchar', length: 250, name: 'status' })
  status: string;
}
