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
  @PrimaryGeneratedColumn({ name: 'announcement_post_id' })
  announcementPostId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'title', type: 'text' })
  title: string;

  @Column({ name: 'abstract', type: 'text' })
  abstract: string;

  @Column({ name: 'notification_type', length: 4 })
  notificationType: string;

  @Column({ name: 'content_detail', type: 'text' })
  contentDetail: string;

  @Column({
    name: 'contact',
    type: 'text',
  })
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

  @ManyToOne(() => UserEntity, (user) => user.announcementPosts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
