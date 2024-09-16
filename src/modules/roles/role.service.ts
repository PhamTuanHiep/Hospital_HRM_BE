import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from 'src/dto/role.dto';
import { RoleEntity } from 'src/entities/role.entity';
import { Role } from 'src/models/role.model';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(roleId: string): Promise<Role | null> {
    return await this.roleRepository.findOne({ where: { roleId } });
  }

  async createRole(roleDto: RoleDto) {
    const role = this.roleRepository.create(roleDto);
    console.log('role:', role);
    //save entity
    let res = await this.roleRepository.save(role);
    console.log('res:', res);

    return res;
  }

  async update(roleId: string, roleDto: RoleDto) {
    const role = await this.roleRepository.findOne({ where: { roleId } });
    const roleUpdate = {
      ...role,
      ...roleDto,
    };
    return await this.roleRepository.save(roleUpdate);
  }

  async delete(roleId: string) {
    const role = await this.roleRepository.findOne({ where: { roleId } });
    return await this.roleRepository.remove(role);
  }
}
