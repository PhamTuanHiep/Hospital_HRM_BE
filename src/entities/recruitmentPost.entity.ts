import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('recruitment-posts')
export class RecruitmentPostEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'recruitment_post_id' })
  recruitmentPostId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'title', length: 200 })
  title: string;

  @Column({ name: 'subtitle' })
  subtitle: string;

  @Column({ name: 'general_requirements', length: 1000 })
  generalRequirements: string;

  @Column({ name: 'benefits', length: 1000 })
  benefits: string;

  @Column({ name: 'required_documents', length: 1000 })
  requiredDocuments: string;

  @Column({ name: 'contact', length: 500 })
  contact: string;

  @Column({
    type: 'varchar',
    length: 250,
    name: 'year',
    nullable: true,
    default: null,
  })
  image: string;

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

  @ManyToOne(() => UserEntity, (user) => user.recruitmentPosts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
