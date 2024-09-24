import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OvertimeDto } from 'src/dto/overtime.dto';
import { OvertimeEntity } from 'src/entities/overtime.entity';
import { Overtime } from 'src/models/overtime.model';
import { Repository } from 'typeorm';

@Injectable()
export class OvertimeService {
  constructor(
    @InjectRepository(OvertimeEntity)
    private overtimeRepository: Repository<OvertimeEntity>,
  ) {}

  async findAll() {
    return await this.overtimeRepository.find();
  }

  async findOne(overtimeId: string): Promise<Overtime | null> {
    return await this.overtimeRepository.findOne({ where: { overtimeId } });
  }

  async create(overtimeDto: OvertimeDto) {
    const overtime = this.overtimeRepository.create(overtimeDto);
    let res = await this.overtimeRepository.save(overtime);
    return res;
  }

  async update(overtimeId: string, overtimeDto: OvertimeDto) {
    const overtime = await this.overtimeRepository.findOne({
      where: { overtimeId },
    });
    const overtimeUpdate = {
      ...overtime,
      ...overtimeDto,
    };
    return await this.overtimeRepository.save(overtimeUpdate);
  }

  async delete(overtimeId: string) {
    const role = await this.overtimeRepository.findOne({
      where: { overtimeId },
    });
    return await this.overtimeRepository.remove(role);
  }
}
