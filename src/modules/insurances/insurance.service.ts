import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { InsuranceDto } from 'src/dto/insurance.dto';
import { InsuranceEntity } from 'src/entities/insurance.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(InsuranceEntity)
    private insuranceRepository: Repository<InsuranceEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.insuranceRepository;
    const relations: Relations<string> = {
      users: true,
    };
    const select: any = {
      users: {
        userId: true,
        fullName: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(insuranceId: string): Promise<InsuranceEntity | null> {
    return await this.insuranceRepository.findOne({
      where: { insuranceId },
      relations: ['users'],
      select: {
        users: {
          userId: true,
          fullName: true,
        },
      },
    });
  }

  async create(insuranceDto: InsuranceDto): Promise<any> {
    const { userIds, ...insurance } = insuranceDto;
    const newInsurance = this.insuranceRepository.create(insurance);

    try {
      if (userIds && userIds.length > 0) {
        const users = await this.userRepository.find({
          where: {
            userId: In(userIds), // Sử dụng In để tìm các id trong mảng userIds
          },
        });
        newInsurance.users = users;
        console.log('-userIds:', userIds);
      } else {
        console.log('Null userIds');
      }

      const res = await this.insuranceRepository.save(newInsurance);

      return await this.insuranceRepository.findOne({
        where: { insuranceId: res.insuranceId },
        relations: ['users'],
        select: {
          users: {
            userId: true,
            fullName: true,
          },
        },
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    insuranceId: string,
    insuranceDto: InsuranceDto,
  ): Promise<UpdateResult> {
    return await this.insuranceRepository.update(insuranceId, insuranceDto);
  }

  async delete(insuranceId: string): Promise<DeleteResult> {
    return await this.insuranceRepository.delete(insuranceId);
  }
}
