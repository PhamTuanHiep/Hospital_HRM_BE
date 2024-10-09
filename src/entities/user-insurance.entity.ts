import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { InsuranceEntity } from './insurance.entity';

@Entity({ name: 'user_insurance' })
export class UserInsuranceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userInsurances)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => InsuranceEntity, (insurance) => insurance.userInsurances)
  @JoinColumn({ name: 'insurance_id' })
  insurance: InsuranceEntity;

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
}
