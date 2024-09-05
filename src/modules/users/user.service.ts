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

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(userDto: UserDto) {
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async update(id: number, userDto: UserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    const userUpdate = {
      ...user,
      ...userDto,
    };
    return await this.userRepository.save(userUpdate);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return await this.userRepository.remove(user);
  }
}
