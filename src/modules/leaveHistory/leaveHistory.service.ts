import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { LeaveHistoryDto } from 'src/dto/leaveHistory.dto';
import { LeaveEntity } from 'src/entities/leave.entity';
import { LeaveHistoryEntity } from 'src/entities/leaveHistory.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class LeaveHistoryService {
  constructor(
    @InjectRepository(LeaveHistoryEntity)
    private leaveHistoryRepository: Repository<LeaveHistoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(LeaveEntity)
    private leaveRepository: Repository<LeaveEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.leaveHistoryRepository;
    const relations: Relations<string> = {
      user: true,
      leave: true,
    };
    const select: any = {
      user: {
        userId: true,
        fullName: true,
      },
      leave: {
        leaveId: true,
        leaveTypes: true,
        maxLeaveEntitlement: true,
      },
    };
    const order = { startDay: 'ASC' };

    return filterGetAll({ query, repository, relations, select, order });
  }

  async findOne(leaveHistoryId: number): Promise<LeaveHistoryEntity | null> {
    return await this.leaveHistoryRepository.findOne({
      where: { leaveHistoryId },
      relations: ['user', 'leave'],
      select: {
        user: {
          userId: true,
          fullName: true,
        },
        leave: {
          leaveId: true,
          leaveTypes: true,
          maxLeaveEntitlement: true,
        },
      },
    });
  }

  async create(leaveHistoryDto: LeaveHistoryDto): Promise<any> {
    const { userId, leaveId, ...leaveHistory } = leaveHistoryDto;
    const newLeaveHistory = this.leaveHistoryRepository.create(leaveHistory);

    const user = await this.userRepository.findOneBy({ userId });
    const leave = await this.leaveRepository.findOneBy({ leaveId });
    try {
      const res = await this.leaveHistoryRepository.save({
        ...newLeaveHistory,
        user,
        leave,
      });

      return await this.leaveHistoryRepository.findOne({
        where: { leaveHistoryId: res.leaveHistoryId },
        relations: ['user', 'leave'],
        select: {
          user: {
            userId: true,
            fullName: true,
          },
          leave: {
            leaveId: true,
            leaveTypes: true,
            maxLeaveEntitlement: true,
          },
        },
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    leaveHistoryId: number,
    leaveHistoryDto: LeaveHistoryDto,
  ): Promise<UpdateResult> {
    return await this.leaveHistoryRepository.update(
      leaveHistoryId,
      leaveHistoryDto,
    );
  }

  async delete(leaveHistoryId: number): Promise<DeleteResult> {
    return await this.leaveHistoryRepository.delete(leaveHistoryId);
  }
}
