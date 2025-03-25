import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilterUsersDto } from 'src/dto/common.filter.dto';
import { UserDto } from 'src/dto/user.dto';
// import { AccountEntity } from 'src/entities/account.entity';
import { DepartmentEntity } from 'src/entities/department.entity';
import { PositionEntity } from 'src/entities/position.entity';
import { UserEntity } from 'src/entities/user.entity';
import { filterGetUsers } from 'src/repositories/users.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PositionEntity)
    private positionRepository: Repository<PositionEntity>,
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
    // @InjectRepository(AccountEntity)
    // private accountRepository: Repository<AccountEntity>,
  ) {}

  async findAll(query: FilterUsersDto): Promise<any> {
    const repository = this.userRepository;
    const sortField = 'user.userId';
    return filterGetUsers({ query, repository, sortField });
  }

  async findOne(userId: number): Promise<UserDto | null> {
    return await this.userRepository.findOne({
      where: { userId },
      relations: [
        'department',
        'position',
        'account',
        // 'userInsurances',
        'leaveHistories',
        'overtimeHistories',
        'evaluateHistories',
        'contractHistories',
        'salaryHistories',
        'medicalTrainingResults',
        // 'nursingTrainingResults',
      ],
      select: {
        userId: true,
        fullName: true,
        gender: true,
        address: true,
        phoneNumber: true,
        nation: true,
        nationality: true,
        hometown: true,
        birthday: true,
        fatherFullName: true,
        fatherBirthday: true,
        motherFullName: true,
        motherBirthday: true,
        weeklySchedule: true,
        jobDescription: true,
        otherDescription: true,
        updatedAt: true,
        createdAt: true,
        salaryCoefficient: true,
        account: {
          accountId: true,
          email: true,
          avatar: true,
        },
        department: {
          departmentId: true,
          departmentName: true,
        },
        leaveHistories: {
          leaveHistoryId: true,
          leaveId: true,
          month: true,
          year: true,
          numOfDaysOff: true,
          dayOffList: true,
        },
        overtimeHistories: {
          overtimeHistoryId: true,
          overtimeId: true,
          startDay: true,
          endDay: true,
        },
        // userInsurances: {
        //   id: true,
        //   insuranceId: true,
        // },
        position: {
          positionId: true,
          positionName: true,
        },
        evaluateHistories: {
          evaluateId: true,
          workLoad: true,
          capacityOfWork: true,
          quantityOfScientificWorks: true,
          workInitiatives: true,
          workingStyle: true,
          responsibilityForWork: true,
          workSpirit: true,
          workResult: true,
          averageScore: true,
          createdAt: true,
          updatedAt: true,
        },
        contractHistories: {
          contractHistoryId: true,
          contractId: true,
          startDay: true,
          endDay: true,
        },
        salaryHistories: {
          salaryHistoryId: true,
          month: true,
          year: true,
          attendance: true,
          paidLeave: true,
          unpaidLeave: true,
          numOfDaysOff: true,
          standardWorkDays: true,
          bonus: true,
          allowance: true,
          salary: true,
        },

        medicalTrainingResults: true,
        // nursingTrainingResults: true,
      },
    });
  }

  async create(userDto: UserDto): Promise<any> {
    const { positionId, departmentId, ...user } = userDto;

    try {
      const position = await this.positionRepository.findOneBy({ positionId });
      console.log('position:', position);

      const department = await this.departmentRepository.findOneBy({
        departmentId,
      });
      console.log('department:', department);

      const newUser = this.userRepository.create(user);
      newUser.position = position;
      newUser.department = department;

      const res = await this.userRepository.save(newUser);
      console.log('res:', res);

      return await this.userRepository.findOne({
        where: { userId: res.userId },
        relations: [
          'position',
          'department',
          'account',
          // 'userInsurances',
          'leaveHistories',
          'overtimeHistories',
          'contractHistories',
          'salaryHistories',
          'medicalTrainingResults',
          // 'nursingTrainingResults',
        ],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create user', HttpStatus.BAD_REQUEST);
    }
  }

  async update(userId: number, UserDto: UserDto): Promise<UpdateResult> {
    return await this.userRepository.update(userId, UserDto);
  }

  async delete(userId: number): Promise<DeleteResult> {
    // const user = await this.userRepository.findOneBy({
    //   userId,
    // });
    // const accountId = user.account.accountId;
    // const resDeleteAccount = await this.accountRepository.delete(accountId);
    // if (resDeleteAccount) return await this.userRepository.delete(userId);
    // else {
    //   throw new HttpException('Can not delete user', HttpStatus.BAD_REQUEST);
    // }
    return await this.userRepository.delete(userId);
  }
}
