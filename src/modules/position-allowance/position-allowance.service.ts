import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { PositionAllowanceDto } from 'src/dto/position-allowance.dto';
import { AllowanceEntity } from 'src/entities/allowance.entity';
import { PositionAllowanceEntity } from 'src/entities/position-allowance.entity';
import { PositionEntity } from 'src/entities/position.entity';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PositionAllowanceService {
  constructor(
    @InjectRepository(PositionAllowanceEntity)
    private positionAllowanceRepository: Repository<PositionAllowanceEntity>,
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
    @InjectRepository(AllowanceEntity)
    private allowanceRepository: Repository<AllowanceEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.positionAllowanceRepository;
    const relations: Relations<string> = {
      position: true,
      allowance: true,
    };
    const select: any = {
      id: true,
      createdAt: true,
      updatedAt: true,
      position: {
        positionId: true,
        positionName: true,
        salaryCoefficient: true,
      },
      allowance: {
        allowanceId: true,
        allowanceAcronym: true,
        allowanceType: true,
        allowanceName: true,
        allowanceRate: true,
        allowanceFee: true,
        note: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(id: number): Promise<PositionAllowanceEntity | null> {
    // return await this.positionAllowanceRepository.findOne({ where: { id } });
    return await this.positionAllowanceRepository.findOne({
      where: { id },
      relations: ['position', 'allowance'],
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        position: {
          positionId: true,
          positionName: true,
          salaryCoefficient: true,
        },
        allowance: {
          allowanceId: true,
          allowanceAcronym: true,
          allowanceType: true,
          allowanceName: true,
          allowanceRate: true,
          allowanceFee: true,
          note: true,
        },
      },
    });
  }

  async create(positionAllowanceDto: PositionAllowanceDto): Promise<any> {
    const { positionId, allowanceId, ...positionAllowance } =
      positionAllowanceDto;
    try {
      const position = await this.positionRepository.findOneBy({ positionId });
      const allowance = await this.allowanceRepository.findOneBy({
        allowanceId,
      });
      const newPositionAllowance =
        this.positionAllowanceRepository.create(positionAllowance);
      newPositionAllowance.position = position;
      newPositionAllowance.allowance = allowance;

      const res =
        await this.positionAllowanceRepository.save(newPositionAllowance);
      return await this.positionAllowanceRepository.findOne({
        where: { id: res.id },
        relations: ['position', 'allowance'],
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          position: {
            positionId: true,
            positionName: true,
            salaryCoefficient: true,
          },
          allowance: {
            allowanceId: true,
            allowanceAcronym: true,
            allowanceType: true,
            allowanceName: true,
            allowanceRate: true,
            allowanceFee: true,
            note: true,
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
    positionAllowanceDto: PositionAllowanceDto,
  ): Promise<UpdateResult> {
    console.log('positionAllowanceDto:', positionAllowanceDto);
    try {
      // const positionAllowance = await this.positionAllowanceRepository.findOne({
      //   where: { id },
      // });
      // const positionAllowanceUpdate = {
      //   ...positionAllowance,
      //   ...positionAllowanceDto,
      // };
      return await this.positionAllowanceRepository.update(
        id,
        positionAllowanceDto,
      );
    } catch (e) {
      console.log('e:', e);
    }

    // return await this.positionAllowanceRepository.save(positionAllowanceUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.positionAllowanceRepository.delete(id);
  }
}
