import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { AllowanceRelationshipDto } from 'src/dto/allowance-relationship.dto';
import { FilterDto } from 'src/dto/common.filter.dto';
import { AllowanceRelationshipEntity } from 'src/entities/allowance-relationship.entity';
import { AllowanceEntity } from 'src/entities/allowance.entity';
import { DepartmentEntity } from 'src/entities/department.entity';
import { PositionEntity } from 'src/entities/position.entity';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class AllowanceRelationshipService {
  constructor(
    @InjectRepository(AllowanceRelationshipEntity)
    private allowanceRelationshipRepository: Repository<AllowanceRelationshipEntity>,
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
    @InjectRepository(AllowanceEntity)
    private allowanceRepository: Repository<AllowanceEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.allowanceRelationshipRepository;
    const relations: Relations<string> = {
      position: true,
      allowance: true,
      department: true,
    };
    const select: any = {
      id: true,
      createdAt: true,
      updatedAt: true,
      position: {
        positionId: true,
        positionName: true,
      },
      department: {
        departmentId: true,
        departmentName: true,
      },
      allowance: {
        allowanceId: true,
        allowanceType: true,
        allowanceNameVI: true,
        allowanceNameEN: true,
        allowanceRate: true,
        allowanceFee: true,
        note: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(id: number): Promise<AllowanceRelationshipEntity | null> {
    // return await this.allowanceRelationshipRepository.findOne({ where: { id } });
    return await this.allowanceRelationshipRepository.findOne({
      where: { id },
      relations: ['position', 'allowance', 'department'],
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        position: {
          positionId: true,
          positionName: true,
        },
        department: {
          departmentId: true,
          departmentName: true,
        },
        allowance: {
          allowanceId: true,
          allowanceType: true,
          allowanceNameVI: true,
          allowanceNameEN: true,
          allowanceRate: true,
          allowanceFee: true,
          note: true,
        },
      },
    });
  }

  async create(
    allowanceRelationshipDto: AllowanceRelationshipDto,
  ): Promise<any> {
    try {
      const {
        departmentId,
        positionId,
        allowanceId,
        ...allowanceRelationship
      } = allowanceRelationshipDto;

      const newAllowanceRelationship =
        this.allowanceRelationshipRepository.create(allowanceRelationship);

      const allowance = await this.allowanceRepository.findOneBy({
        allowanceId,
      });

      if (departmentId) {
        const department = await this.departmentRepository.findOneBy({
          departmentId,
        });
        newAllowanceRelationship.department = department;
      } else if (positionId) {
        const position = await this.positionRepository.findOneBy({
          positionId,
        });
        newAllowanceRelationship.position = position;
      }

      newAllowanceRelationship.allowance = allowance;

      const res = await this.allowanceRelationshipRepository.save(
        newAllowanceRelationship,
      );
      return await this.allowanceRelationshipRepository.findOne({
        where: { id: res.id },
        relations: ['position', 'allowance', 'department'],
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          position: {
            positionId: true,
            positionName: true,
          },
          department: {
            departmentId: true,
            departmentName: true,
          },
          allowance: {
            allowanceId: true,
            allowanceType: true,
            allowanceNameVI: true,
            allowanceNameEN: true,
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
    allowanceRelationshipDto: AllowanceRelationshipDto,
  ): Promise<UpdateResult> {
    console.log('allowanceRelationshipDto:', allowanceRelationshipDto);
    try {
      return await this.allowanceRelationshipRepository.update(
        id,
        allowanceRelationshipDto,
      );
    } catch (e) {
      console.log('e:', e);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.allowanceRelationshipRepository.delete(id);
  }
}
