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

  @Column({ name: 'title', type: 'text' })
  title: string;

  @Column({ name: 'sub_title' })
  subtitle: string;

  @Column({ name: 'general_requirements', type: 'text' })
  generalRequirements: string;

  @Column({ name: 'benefits', type: 'text' })
  benefits: string;

  @Column({ name: 'required_documents', type: 'text' })
  requiredDocuments: string;

  @Column({ name: 'contact', type: 'text' })
  contact: string;

  @Column({
    type: 'text',
    name: 'image',
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
