import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import {
  extractFilePathFromUrl,
  filterGetAll,
} from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { RecruitmentPostDto } from 'src/dto/recruitmentPost.dto';
import { RecruitmentPostEntity } from 'src/entities/recruitmentPost.entity';
import * as admin from 'firebase-admin';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class RecruitmentPostService {
  constructor(
    @InjectRepository(RecruitmentPostEntity)
    private recruitmentPostRepository: Repository<RecruitmentPostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.recruitmentPostRepository;
    const relations: Relations<string> = {
      user: true,
    };
    const select: any = {
      recruitmentPostId: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      subtitle: true,
      generalRequirements: true,
      benefits: true,
      requiredDocuments: true,
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
    recruitmentPostId: number,
  ): Promise<RecruitmentPostEntity | null> {
    return await this.recruitmentPostRepository.findOne({
      where: { recruitmentPostId },
      relations: ['user'],
      select: {
        recruitmentPostId: true,
        createdAt: true,
        updatedAt: true,
        title: true,
        subtitle: true,
        generalRequirements: true,
        benefits: true,
        requiredDocuments: true,
        contact: true,
        image: true,
        user: {
          userId: true,
          fullName: true,
        },
      },
    });
  }

  async create(recruitmentPostDto: RecruitmentPostDto): Promise<any> {
    const { userId, ...recruitmentPost } = recruitmentPostDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });
      const newRecruitmentPost =
        this.recruitmentPostRepository.create(recruitmentPost);
      newRecruitmentPost.user = user;

      const res = await this.recruitmentPostRepository.save(newRecruitmentPost);

      return await this.recruitmentPostRepository.findOne({
        where: { recruitmentPostId: res.recruitmentPostId },
        relations: ['user'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  private bucket = admin.storage().bucket();

  async update(
    recruitmentPostId: number,
    recruitmentPostDto: RecruitmentPostDto,
  ): Promise<UpdateResult> {
    const { image, ...recruitmentPost } = recruitmentPostDto;
    if (image) {
      const recruitmentPostUpdate =
        await this.recruitmentPostRepository.findOne({
          where: {
            recruitmentPostId,
          },
        });

      const filePath = extractFilePathFromUrl(recruitmentPostUpdate.image);
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

    return await this.recruitmentPostRepository.update(
      recruitmentPostId,
      recruitmentPostDto,
    );
  }

  async delete(recruitmentPostId: number): Promise<DeleteResult> {
    const recruitmentPostDelete = await this.recruitmentPostRepository.findOne({
      where: {
        recruitmentPostId,
      },
    });
    if (recruitmentPostDelete.image) {
      const filePath = extractFilePathFromUrl(recruitmentPostDelete.image);
      console.log('filePath:', filePath);
      try {
        if (filePath) {
          await this.bucket.file(filePath).delete();
          console.log(`File ${filePath} deleted successfully.`);
        }
        console.log(`Not found file.`);
      } catch (error) {
        console.error(`Failed to delete file ${filePath}:`, error);
        throw new Error(`Could not delete file ${filePath}.`);
      }
    }
    return await this.recruitmentPostRepository.delete(recruitmentPostId);
  }
}
