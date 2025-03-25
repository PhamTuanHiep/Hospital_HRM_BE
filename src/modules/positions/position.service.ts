import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilterPositionsDto } from 'src/dto/common.filter.dto';
import { PositionDto } from 'src/dto/position.dto';

import { PositionEntity } from 'src/entities/position.entity';
import { filterGetPositions } from 'src/repositories/positions.repository';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
  ) {}

  async findAll(query: FilterPositionsDto): Promise<any> {
    const repository = this.positionRepository;

    return filterGetPositions({ query, repository });
  }

  async findOne(positionId: string): Promise<PositionEntity | null> {
    return await this.positionRepository.findOne({
      where: { positionId },
      relations: ['users', 'allowanceRelationship'],
      select: {
        positionId: true,
        createdAt: true,
        updatedAt: true,
        positionName: true,
        users: {
          userId: true,
          fullName: true,
        },
      },
    });
  }

  async create(positionDto: PositionDto) {
    try {
      const position = this.positionRepository.create(positionDto);

      const res = await this.positionRepository.save(position);

      return await this.positionRepository.findOne({
        where: { positionId: res.positionId },
        relations: ['users', 'allowanceRelationship'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    positionId: string,
    PositionDto: PositionDto,
  ): Promise<UpdateResult> {
    return await this.positionRepository.update(positionId, PositionDto);
  }

  async delete(positionId: string): Promise<DeleteResult> {
    return await this.positionRepository.delete(positionId);
  }
}
