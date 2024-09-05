import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') //ttable name
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn() //auto fill, increase, primary key
  id: number;

  @Column({ type: 'varchar', length: 250 })
  firstName: string;

  @Column({ type: 'varchar', length: 250 })
  lastName: string;

  @Column({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @Column({ type: 'varchar', length: 1 })
  gender: string;

  @Column({ type: 'varchar', length: 250 })
  address: string;

  @Column({ type: 'varchar', length: 250 })
  phoneNumber: string;

  @Column() //default is integer
  roleId: number;

  @Column()
  positionId: number;

  @Column({ type: 'varchar', length: 1000 })
  image: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
