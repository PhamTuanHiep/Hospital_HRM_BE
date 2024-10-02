import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OvertimeHistoryDto } from 'src/dto/overtimeHistory.dto';
import { OvertimeHistoryEntity } from 'src/entities/overtimeHistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OvertimeHistoryService {
  constructor(
    @InjectRepository(OvertimeHistoryEntity)
    private overtimeHistoryRepository: Repository<OvertimeHistoryEntity>,
  ) {}

  async findAll() {
    return await this.overtimeHistoryRepository.find();
  }

  async findOne(overtimeHistoryId: number): Promise<OvertimeHistoryDto | null> {
    return await this.overtimeHistoryRepository.findOne({
      where: { overtimeHistoryId },
    });
  }

  async create(overtimeHistoryDto: OvertimeHistoryDto) {
    const overtimeHistory =
      this.overtimeHistoryRepository.create(overtimeHistoryDto);
    //save entity
    let res = await this.overtimeHistoryRepository.save(overtimeHistory);

    return res;
  }

  async update(
    overtimeHistoryId: number,
    overtimeHistoryDto: OvertimeHistoryDto,
  ) {
    const overtimeHistory = await this.overtimeHistoryRepository.findOne({
      where: { overtimeHistoryId },
    });
    const overtimeHistoryUpdate = {
      ...overtimeHistory,
      ...overtimeHistoryDto,
    };
    return await this.overtimeHistoryRepository.save(overtimeHistoryUpdate);
  }

  async delete(overtimeHistoryId: number) {
    const user = await this.overtimeHistoryRepository.findOne({
      where: { overtimeHistoryId },
    });
    return await this.overtimeHistoryRepository.remove(user);
  }
}
