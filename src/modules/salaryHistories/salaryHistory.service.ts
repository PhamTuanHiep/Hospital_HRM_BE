import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { SalaryHistoryDto } from 'src/dto/salaryHistory.dto';
import { SalaryHistoryEntity } from 'src/entities/salaryHistory.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SalaryHistoryService {
  constructor(
    @InjectRepository(SalaryHistoryEntity)
    private salaryHistoryRepository: Repository<SalaryHistoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.salaryHistoryRepository;
    const relations: Relations<string> = {
      user: true,
    };
    const select: any = {
      salaryHistoryId: true,
      createdAt: true,
      updatedAt: true,
      month: true,
      year: true,
      attendance: true,
      paidLeave: true,
      unpaidLeave: true,
      numOfDaysOff: true,
      standardWorkDays: true,
      bonus: true,
      allowance: true,
      salary: true,
      user: {
        userId: true,
        fullName: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(salaryHistoryId: number): Promise<SalaryHistoryEntity | null> {
    return await this.salaryHistoryRepository.findOne({
      where: { salaryHistoryId },
      relations: ['user'],
      select: {
        salaryHistoryId: true,
        createdAt: true,
        updatedAt: true,
        month: true,
        year: true,
        attendance: true,
        paidLeave: true,
        unpaidLeave: true,
        numOfDaysOff: true,
        standardWorkDays: true,
        bonus: true,
        allowance: true,
        salary: true,
        user: {
          userId: true,
          fullName: true,
        },
      },
    });
  }

  async create(salaryHistoryDto: SalaryHistoryDto): Promise<any> {
    const { userId, ...salaryHistory } = salaryHistoryDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });
      const newSalaryHistory =
        this.salaryHistoryRepository.create(salaryHistory);
      newSalaryHistory.user = user;

      const res = await this.salaryHistoryRepository.save(newSalaryHistory);

      return await this.salaryHistoryRepository.findOne({
        where: { salaryHistoryId: res.salaryHistoryId },
        relations: ['user'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    salaryHistoryId: number,
    salaryHistoryDto: SalaryHistoryDto,
  ): Promise<UpdateResult> {
    return await this.salaryHistoryRepository.update(
      salaryHistoryId,
      salaryHistoryDto,
    );
  }

  async delete(salaryHistoryId: number): Promise<DeleteResult> {
    return await this.salaryHistoryRepository.delete(salaryHistoryId);
  }
}
