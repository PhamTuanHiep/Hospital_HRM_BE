import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from 'src/dto/common.filter.dto';
import { DepartmentDto } from 'src/dto/department.dto';
import { DepartmentEntity } from 'src/entities/department.entity';
import { filterGetDepartments } from 'src/repositories/departments.repository';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.departmentRepository;

    return filterGetDepartments({
      query,
      repository,
    });
  }

  async findOne(departmentId: string): Promise<DepartmentEntity | null> {
    return await this.departmentRepository.findOne({
      where: { departmentId },
      relations: ['users', 'overtimeHistories'],
      select: {
        users: {
          userId: true,
          fullName: true,
        },
        overtimeHistories: {
          overtimeHistoryId: true,
          userId: true,
          overtimeId: true,
          startDay: true,
          endDay: true,
        },
      },
    });
  }

  async create(departmentDto: DepartmentDto) {
    try {
      const newDepartment = this.departmentRepository.create(departmentDto);
      const res = await this.departmentRepository.save(newDepartment);

      return await this.departmentRepository.findOne({
        where: { departmentId: res.departmentId },
        relations: ['users'],
        select: {
          users: {
            userId: true,
            fullName: true,
          },
        },
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    departmentId: string,
    departmentDto: DepartmentDto,
  ): Promise<UpdateResult> {
    return await this.departmentRepository.update(departmentId, departmentDto);
  }

  async delete(departmentId: string): Promise<DeleteResult> {
    return await this.departmentRepository.delete(departmentId);
  }
}
