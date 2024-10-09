import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { UserInsuranceDto } from 'src/dto/user-insurance.dto';
import { InsuranceEntity } from 'src/entities/insurance.entity';
import { UserInsuranceEntity } from 'src/entities/user-insurance.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserInsuranceService {
  constructor(
    @InjectRepository(UserInsuranceEntity)
    private userInsuranceRepository: Repository<UserInsuranceEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(InsuranceEntity)
    private insuranceRepository: Repository<InsuranceEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.userInsuranceRepository;
    const relations: Relations<string> = {
      user: true,
      insurance: true,
    };
    const select: any = {
      id: true,
      createdAt: true,
      updatedAt: true,
      user: {
        userId: true,
        fullName: true,
      },
      insurance: {
        insuranceId: true,
        insuranceName: true,
        insuranceType: true,
        monthlyPercentage: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(id: number): Promise<UserInsuranceEntity | null> {
    // return await this.userInsuranceRepository.findOne({ where: { id } });
    return await this.userInsuranceRepository.findOne({
      where: { id },
      relations: ['user', 'insurance'],
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        user: {
          userId: true,
          fullName: true,
        },
        insurance: {
          insuranceId: true,
          insuranceName: true,
          insuranceType: true,
          monthlyPercentage: true,
        },
      },
    });
  }

  async create(userInsuranceDto: UserInsuranceDto): Promise<any> {
    const { userId, insuranceId, ...userInsurance } = userInsuranceDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });
      const insurance = await this.insuranceRepository.findOneBy({
        insuranceId,
      });
      const newUserInsurance =
        this.userInsuranceRepository.create(userInsurance);
      newUserInsurance.user = user;
      newUserInsurance.insurance = insurance;

      const res = await this.userInsuranceRepository.save(newUserInsurance);
      return await this.userInsuranceRepository.findOne({
        where: { id: res.id },
        relations: ['user', 'insurance'],
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          user: {
            userId: true,
            fullName: true,
          },
          insurance: {
            insuranceId: true,
            insuranceName: true,
            insuranceType: true,
            monthlyPercentage: true,
          },
        },
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    userInsuranceDto: UserInsuranceDto,
  ): Promise<UpdateResult> {
    return await this.userInsuranceRepository.update(id, userInsuranceDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userInsuranceRepository.delete(id);
  }
}
