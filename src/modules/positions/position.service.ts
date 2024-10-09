import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations, Select } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { PositionDto } from 'src/dto/position.dto';

import { PositionEntity } from 'src/entities/position.entity';
import { Position } from 'src/models/position.model';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.positionRepository;
    const relations: Relations<string> = {
      users: true,
      positionAllowances: true,
    };
    // const select: Select<string> = {
    //   users: {
    //     userId: true,
    //     fullName: true,
    //   },
    //   positionAllowances: true
    // };
    // const arrSearch: string[] = ['email'];

    return filterGetAll({ query, repository, relations });
  }

  async findOne(positionId: string): Promise<PositionEntity | null> {
    return await this.positionRepository.findOne({
      where: { positionId },
      relations: ['users', 'positionAllowances'],
      // select: {
      //   users: {
      //     userId: true,
      //     fullName: true,
      //   },
      // },
    });
  }

  async create(positionDto: PositionDto) {
    try {
      const position = this.positionRepository.create(positionDto);

      const res = await this.positionRepository.save(position);

      return await this.positionRepository.findOne({
        where: { positionId: res.positionId },
        relations: ['users', 'positionAllowances'],
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
