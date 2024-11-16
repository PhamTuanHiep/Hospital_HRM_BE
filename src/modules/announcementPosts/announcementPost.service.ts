import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import {
  extractFilePathFromUrl,
  filterGetAll,
} from 'src/common/common.use.helper';
import { AnnouncementPostDto } from 'src/dto/announcementPost.dto';
import { FilterDto } from 'src/dto/common.filter.dto';
import { AnnouncementPostEntity } from 'src/entities/announcementPost.entity';
import * as admin from 'firebase-admin';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AnnouncementPostService {
  constructor(
    @InjectRepository(AnnouncementPostEntity)
    private announcementPostRepository: Repository<AnnouncementPostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.announcementPostRepository;
    const relations: Relations<string> = {
      user: true,
    };
    const select: any = {
      announcementPostId: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      abstract: true,
      notificationType: true,
      contentDetail: true,
      contact: true,
      image: true,
      user: {
        userId: true,
        fullName: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(
    announcementPostId: number,
  ): Promise<AnnouncementPostEntity | null> {
    return await this.announcementPostRepository.findOne({
      where: { announcementPostId },
      relations: ['user'],
      select: {
        announcementPostId: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        abstract: true,
        notificationType: true,
        contentDetail: true,
        contact: true,
        image: true,
        user: {
          userId: true,
          fullName: true,
        },
      },
    });
  }

  async create(announcementPostDto: AnnouncementPostDto): Promise<any> {
    const { userId, ...announcementPost } = announcementPostDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });
      const newAnnouncementPost =
        this.announcementPostRepository.create(announcementPost);
      newAnnouncementPost.user = user;

      const res =
        await this.announcementPostRepository.save(newAnnouncementPost);

      return await this.announcementPostRepository.findOne({
        where: { announcementPostId: res.announcementPostId },
        relations: ['user'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  private bucket = admin.storage().bucket();

  async update(
    announcementPostId: number,
    announcementPostDto: AnnouncementPostDto,
    imageUrl?: string,
  ): Promise<UpdateResult> {
    const { image, ...announcementPost } = announcementPostDto;
    const announcementPostUpdate =
      await this.announcementPostRepository.findOne({
        where: {
          announcementPostId,
        },
      });

    if (imageUrl) {
      if (image) {
        const filePath = extractFilePathFromUrl(announcementPostUpdate.image);
        if (filePath) {
          await this.bucket.file(filePath).delete();
        }
        try {
          console.log(`File ${filePath} deleted successfully.`);
        } catch (error) {
          console.error(`Failed to delete file ${filePath}:`, error);
          throw new Error(`Could not delete file ${filePath}.`);
        }
      }
      announcementPostDto.image = imageUrl;
    } else {
      announcementPostDto.image = announcementPostUpdate.image;
    }
    return await this.announcementPostRepository.update(
      announcementPostId,
      announcementPostDto,
    );
  }

  async delete(announcementPostId: number): Promise<DeleteResult> {
    const announcementPostDelete =
      await this.announcementPostRepository.findOne({
        where: {
          announcementPostId,
        },
      });
    if (announcementPostDelete.image) {
      const filePath = extractFilePathFromUrl(announcementPostDelete.image);
      try {
        if (filePath) {
          await this.bucket.file(filePath).delete();
        }
        console.log(`File ${filePath} deleted successfully.`);
      } catch (error) {
        console.error(`Failed to delete file ${filePath}:`, error);
        throw new Error(`Could not delete file ${filePath}.`);
      }
    }
    return await this.announcementPostRepository.delete(announcementPostId);
  }
}
