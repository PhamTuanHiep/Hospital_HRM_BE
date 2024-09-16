import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllowanceDto } from 'src/dto/allowance.dto';

import { AllowanceEntity } from 'src/entities/allowance.entity';
import { Allowance } from 'src/models/allowance.model';

import { Repository } from 'typeorm';

@Injectable()
export class AllowanceService {
  constructor(
    @InjectRepository(AllowanceEntity)
    private allowanceRepository: Repository<AllowanceEntity>,
  ) {}

  async findAll() {
    return await this.allowanceRepository.find();
  }

  async findOne(allowanceId: string): Promise<Allowance | null> {
    return await this.allowanceRepository.findOne({ where: { allowanceId } });
  }

  async createRole(allowanceDto: AllowanceDto) {
    const allowance = this.allowanceRepository.create(allowanceDto);
    console.log('allowance:', allowance);
    //save entity
    let res = await this.allowanceRepository.save(allowance);
    console.log('res:', res);

    return res;
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
