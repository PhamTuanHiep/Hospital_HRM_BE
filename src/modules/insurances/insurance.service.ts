import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsuranceDto } from 'src/dto/insurance.dto';
import { InsuranceEntity } from 'src/entities/insurance.entity';
import { Insurance } from 'src/models/insurance.model';
import { Repository } from 'typeorm';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(InsuranceEntity)
    private insuranceRepository: Repository<InsuranceEntity>,
  ) {}

  async findAll() {
    return await this.insuranceRepository.find();
  }

  async findOne(insuranceId: string): Promise<Insurance | null> {
    return await this.insuranceRepository.findOne({ where: { insuranceId } });
  }

  async createRole(insuranceDto: InsuranceDto) {
    const insurance = this.insuranceRepository.create(insuranceDto);
    console.log('insurance:', insurance);
    //save entity
    let res = await this.insuranceRepository.save(insurance);
    console.log('res:', res);

    return res;
  }

  async update(insuranceId: string, insuranceDto: InsuranceDto) {
    const insurance = await this.insuranceRepository.findOne({
      where: { insuranceId },
    });
    const insuranceUpdate = {
      ...insurance,
      ...insuranceDto,
    };
    return await this.insuranceRepository.save(insuranceUpdate);
  }

  async delete(insuranceId: string) {
    const insurance = await this.insuranceRepository.findOne({
      where: { insuranceId },
    });
    return await this.insuranceRepository.remove(insurance);
  }
}
