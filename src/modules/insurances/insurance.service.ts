import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { InsuranceDto } from 'src/dto/insurance.dto';
import { InsuranceEntity } from 'src/entities/insurance.entity';
// import { UserInsuranceEntity } from 'src/entities/user-insurance.entity';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(InsuranceEntity)
    private insuranceRepository: Repository<InsuranceEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.insuranceRepository;
    const relations: Relations<string> = {
      userInsurances: true,
    };
    const select: any = {
      userInsurances: {
        id: true,
        userId: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(insuranceId: string): Promise<InsuranceEntity | null> {
    return await this.insuranceRepository.findOne({
      where: { insuranceId },
      relations: ['userInsurances'],
      select: {
        // userInsurances: {
        //   id: true,
        //   userId: true,
        // },
      },
    });
  }

  async create(insuranceDto: InsuranceDto): Promise<any> {
    try {
      const insurance = this.insuranceRepository.create(insuranceDto);

      const res = await this.insuranceRepository.save(insurance);

      return await this.insuranceRepository.findOne({
        where: { insuranceId: res.insuranceId },
        relations: ['userInsurances'],
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
