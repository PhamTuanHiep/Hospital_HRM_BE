import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { NursingTrainingResultsDto } from 'src/dto/nursingTrainingResults.dto';
import { NursingTrainingResultsEntity } from 'src/entities/nursingTrainingResults.entity';
import { UserEntity } from 'src/entities/user.entity';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class NursingTrainingResultsService {
  constructor(
    @InjectRepository(NursingTrainingResultsEntity)
    private nursingTrainingResultsEntityRepository: Repository<NursingTrainingResultsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findAll(query: FilterDto): Promise<any> {
    const repository = this.nursingTrainingResultsEntityRepository;
    const relations: Relations<string> = {
      user: true,
    };

    return filterGetAll({ query, repository, relations });
  }

  async findOne(
    trainingResultsId: number,
  ): Promise<NursingTrainingResultsEntity | null> {
    return await this.nursingTrainingResultsEntityRepository.findOne({
      where: { trainingResultsId },
      relations: ['user'],
    });
  }

  async create(
    nursingTrainingResultsDto: NursingTrainingResultsDto,
  ): Promise<any> {
    const { userId, ...nursingTrainingResults } = nursingTrainingResultsDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });

      const newNursingTrainingResults =
        this.nursingTrainingResultsEntityRepository.create(
          nursingTrainingResults,
        );
      newNursingTrainingResults.user = user;

      const res = await this.nursingTrainingResultsEntityRepository.save(
        newNursingTrainingResults,
      );
      return await this.nursingTrainingResultsEntityRepository.findOne({
        where: { trainingResultsId: res.trainingResultsId },
        relations: ['user'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    trainingResultsId: number,
    nursingTrainingResultsDto: NursingTrainingResultsDto,
  ): Promise<UpdateResult> {
    return await this.nursingTrainingResultsEntityRepository.update(
      trainingResultsId,
      nursingTrainingResultsDto,
    );
  }

  async delete(trainingResultsId: number): Promise<DeleteResult> {
    return await this.nursingTrainingResultsEntityRepository.delete(
      trainingResultsId,
    );
  }
}
