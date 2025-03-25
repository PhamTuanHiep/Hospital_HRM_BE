import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllowanceDto } from 'src/dto/allowance.dto';
import { FilterDto } from 'src/dto/common.filter.dto';

import { AllowanceEntity } from 'src/entities/allowance.entity';
import { filterGetAllowances } from 'src/repositories/allowances.repository';

import { Repository } from 'typeorm';

@Injectable()
export class AllowanceService {
  constructor(
    @InjectRepository(AllowanceEntity)
    private allowanceRepository: Repository<AllowanceEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.allowanceRepository;

    return filterGetAllowances({ query, repository });
  }

  async findOne(allowanceId: string): Promise<AllowanceEntity | null> {
    return await this.allowanceRepository.findOne({
      where: { allowanceId },
    });
  }

  async create(allowanceDto: AllowanceDto) {
    try {
      const allowance = this.allowanceRepository.create(allowanceDto);
      console.log('allowance:', allowance);
      //save entity
      const res = await this.allowanceRepository.save(allowance);
      console.log('res:', res);
      return res;
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(allowanceId: string, allowanceDto: AllowanceDto) {
    const allowance = await this.allowanceRepository.findOne({
      where: { allowanceId },
    });
    const allowanceUpdate = {
      ...allowance,
      ...allowanceDto,
    };
    return await this.allowanceRepository.save(allowanceUpdate);
  }

  async delete(allowanceId: string) {
    const allowance = await this.allowanceRepository.findOne({
      where: { allowanceId },
    });
    return await this.allowanceRepository.remove(allowance);
  }
}
