import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { UserDto } from 'src/dto/user.dto';
import { DepartmentEntity } from 'src/entities/department.entity';
import { PositionEntity } from 'src/entities/position.entity';
import { UserEntity } from 'src/entities/user.entity';
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
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.userRepository;
    const relations: Relations<string> = {
      position: true,
      department: true,
      account: true,
      userInsurances: true,
      leaveHistories: true,
      overtimeHistories: true,
    };

    return filterGetAll({ query, repository, relations });
  }

  async findOne(userId: number): Promise<UserDto | null> {
    return await this.userRepository.findOne({
      where: { userId },
      relations: [
        'department',
        'position',
        'account',
        'userInsurances',
        'leaveHistories',
        'overtimeHistories',
      ],
      // select: {
      //   userInsurances: {
      //     user: true,

      //   },
      // },
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
          'userInsurances',
          'leaveHistories',
          'overtimeHistories',
        ],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(userId: number, UserDto: UserDto): Promise<UpdateResult> {
    return await this.userRepository.update(userId, UserDto);
  }

  async delete(userId: number): Promise<DeleteResult> {
    return await this.userRepository.delete(userId);
  }
}
