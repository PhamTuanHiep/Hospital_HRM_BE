import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentDto } from 'src/dto/department.dto';
import { DepartmentEntity } from 'src/entities/department.entity';
import { Department } from 'src/models/department.model';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async findAll() {
    return await this.departmentRepository.find();
  }

  async findOne(departmentId: string): Promise<Department | null> {
    return await this.departmentRepository.findOne({ where: { departmentId } });
  }

  async createRole(departmentDto: DepartmentDto) {
    const department = this.departmentRepository.create(departmentDto);
    console.log('department:', department);
    //save entity
    let res = await this.departmentRepository.save(department);
    console.log('res:', res);

    return res;
  }

  async update(departmentId: string, departmentDto: DepartmentDto) {
    const department = await this.departmentRepository.findOne({
      where: { departmentId },
    });
    const departmentUpdate = {
      ...department,
      ...departmentDto,
    };
    return await this.departmentRepository.save(departmentUpdate);
  }

  async delete(departmentId: string) {
    const role = await this.departmentRepository.findOne({
      where: { departmentId },
    });
    return await this.departmentRepository.remove(role);
  }
}
