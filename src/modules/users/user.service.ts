import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(userId: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { userId } });
  }

  async createUser(userDto: UserDto) {
    const user = this.userRepository.create(userDto);
    console.log('userDto:', userDto);
    console.log('user:', user);
    //save entity
    let res = await this.userRepository.save(user);
    console.log('res:', res);

    return res;
  }

  async update(userId: number, userDto: UserDto) {
    const user = await this.userRepository.findOne({ where: { userId } });
    const userUpdate = {
      ...user,
      ...userDto,
    };
    return await this.userRepository.save(userUpdate);
  }

  async delete(userId: number) {
    const user = await this.userRepository.findOne({ where: { userId } });
    return await this.userRepository.remove(user);
  }
}
