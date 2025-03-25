import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { EvaluateDto } from 'src/dto/evaluate.dto';
import { EvaluateEntity } from 'src/entities/evaluate.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class EvaluateService {
  constructor(
    @InjectRepository(EvaluateEntity)
    private evaluateRepository: Repository<EvaluateEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.evaluateRepository;
    const relations: Relations<string> = {
      user: true,
    };
    const select: any = {
      evaluateId: true,
      createdAt: true,
      updatedAt: true,
      workLoad: true,
      capacityOfWork: true,
      quantityOfScientificWorks: true,
      workInitiatives: true,
      workingStyle: true,
      responsibilityForWork: true,
      workSpirit: true,
      workResult: true,
      averageScore: true,
      user: {
        userId: true,
        fullName: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(evaluateId: number): Promise<EvaluateEntity | null> {
    return await this.evaluateRepository.findOne({
      where: { evaluateId },
      relations: ['user'],
      select: {
        evaluateId: true,
        createdAt: true,
        updatedAt: true,
        workLoad: true,
        capacityOfWork: true,
        quantityOfScientificWorks: true,
        workInitiatives: true,
        workingStyle: true,
        responsibilityForWork: true,
        workSpirit: true,
        workResult: true,
        averageScore: true,
        user: {
          userId: true,
          fullName: true,
        },
      },
    });
  }

  async create(evaluateDto: EvaluateDto): Promise<any> {
    const { userId, ...evaluate } = evaluateDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });
      const newEvaluate = this.evaluateRepository.create(evaluate);
      newEvaluate.user = user;

      const res = await this.evaluateRepository.save(newEvaluate);

      return await this.evaluateRepository.findOne({
        where: { evaluateId: res.evaluateId },
        relations: ['user'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    evaluateId: number,
    evaluateDto: EvaluateDto,
  ): Promise<UpdateResult> {
    const sum =
      evaluateDto.workLoad +
      evaluateDto.capacityOfWork +
      evaluateDto.quantityOfScientificWorks +
      evaluateDto.workInitiatives +
      evaluateDto.workingStyle +
      evaluateDto.responsibilityForWork +
      evaluateDto.workSpirit +
      evaluateDto.workResult;
    const count = 8;
    const newAverageScore = sum / count;

    return await this.evaluateRepository.update(evaluateId, {
      ...evaluateDto,
      averageScore: newAverageScore,
    });
  }

  async delete(evaluateId: number): Promise<DeleteResult> {
    return await this.evaluateRepository.delete(evaluateId);
  }
}
