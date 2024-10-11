import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { OvertimeHistoryDto } from 'src/dto/overtimeHistory.dto';
import { DepartmentEntity } from 'src/entities/department.entity';
import { OvertimeEntity } from 'src/entities/overtime.entity';
import { OvertimeHistoryEntity } from 'src/entities/overtimeHistory.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class OvertimeHistoryService {
  constructor(
    @InjectRepository(OvertimeHistoryEntity)
    private overtimeHistoryRepository: Repository<OvertimeHistoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OvertimeEntity)
    private overtimeRepository: Repository<OvertimeEntity>,
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.overtimeHistoryRepository;
    const relations: Relations<string> = {
      overtime: true,
      user: true,
      department: true,
    };
    const select: any = {
      overtimeHistoryId: true,
      createdAt: true,
      updatedAt: true,
      note: true,
      startDay: true,
      endDay: true,
      overtime: {
        overtimeId: true,
        overtimeName: true,
        overtimePay: true,
      },
      user: {
        userId: true,
        fullName: true,
      },
      department: {
        departmentId: true,
        departmentName: true,
      },
    };

    return filterGetAll({ query, repository, relations, select });
  }

  async findOne(
    overtimeHistoryId: number,
  ): Promise<OvertimeHistoryEntity | null> {
    return await this.overtimeHistoryRepository.findOne({
      where: { overtimeHistoryId },
      relations: ['overtime', 'user', 'department'],
      select: {
        overtimeHistoryId: true,
        createdAt: true,
        updatedAt: true,
        note: true,
        startDay: true,
        endDay: true,
        overtime: {
          overtimeId: true,
          overtimeName: true,
          overtimePay: true,
        },
        user: {
          userId: true,
          fullName: true,
        },
        department: {
          departmentId: true,
          departmentName: true,
        },
      },
    });
  }

  async create(overtimeHistoryDto: OvertimeHistoryDto): Promise<any> {
    const { userId, overtimeId, departmentId, ...overtimeHistory } =
      overtimeHistoryDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });
      const overtime = await this.overtimeRepository.findOneBy({
        overtimeId,
      });
      const department = await this.departmentRepository.findOneBy({
        departmentId,
      });
      const newOvertimeHistory =
        this.overtimeHistoryRepository.create(overtimeHistory);
      newOvertimeHistory.user = user;
      newOvertimeHistory.overtime = overtime;
      newOvertimeHistory.department = department;

      const res = await this.overtimeHistoryRepository.save(newOvertimeHistory);

      return await this.overtimeHistoryRepository.findOne({
        where: { overtimeHistoryId: res.overtimeHistoryId },
        relations: ['overtime', 'user', 'department'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    overtimeHistoryId: number,
    overtimeHistoryDto: OvertimeHistoryDto,
  ): Promise<UpdateResult> {
    return await this.overtimeHistoryRepository.update(
      overtimeHistoryId,
      overtimeHistoryDto,
    );
  }

  async delete(overtimeHistoryId: number): Promise<DeleteResult> {
    return await this.overtimeHistoryRepository.delete(overtimeHistoryId);
  }
}
