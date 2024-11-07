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

@Entity('announcement-posts')
export class AnnouncementPostEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'salary_history_id' })
  announcementPostId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'title', length: 200 })
  title: string;

  @Column({ name: 'abstract', length: 1000 })
  abstract: string;

  @Column({ name: 'notificationType', length: 20 })
  notificationType: string;

  @Column({ name: 'contentDetail' })
  contentDetail: string;

  @Column({ name: 'contact' })
  contact: string;

  @Column({
    type: 'varchar',
    length: 250,
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

  @ManyToOne(() => UserEntity, (user) => user.announcementPosts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
