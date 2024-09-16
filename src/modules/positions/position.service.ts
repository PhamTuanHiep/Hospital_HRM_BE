import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PositionDto } from 'src/dto/position.dto';

import { PositionEntity } from 'src/entities/position.entity';
import { Position } from 'src/models/position.model';

import { Repository } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
  ) {}

  async findAll() {
    return await this.positionRepository.find();
  }

  async findOne(positionId: string): Promise<Position | null> {
    return await this.positionRepository.findOne({ where: { positionId } });
  }

  async create(positionDto: PositionDto) {
    const position = this.positionRepository.create(positionDto);
    console.log('position:', position);
    //save entity
    let res = await this.positionRepository.save(position);
    console.log('res:', res);

    return res;
  }

  async update(positionId: string, positionDto: PositionDto) {
    const position = await this.positionRepository.findOne({
      where: { positionId },
    });
    const positionUpdate = {
      ...position,
      ...positionDto,
    };
    return await this.positionRepository.save(positionUpdate);
  }

  async delete(positionId: string) {
    const role = await this.positionRepository.findOne({
      where: { positionId },
    });
    return await this.positionRepository.remove(role);
  }
}
