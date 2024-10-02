import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveDto } from 'src/dto/leave.dto';
import { LeaveEntity } from 'src/entities/leave.entity';
import { Leave } from 'src/models/leave.model';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(LeaveEntity)
    private leaveRepository: Repository<LeaveEntity>,
  ) {}

  async findAll() {
    return await this.leaveRepository.find();
  }

  async findOne(leaveId: string): Promise<Leave | null> {
    return await this.leaveRepository.findOne({ where: { leaveId } });
  }

  async create(leaveDto: LeaveDto) {
    const leave = this.leaveRepository.create(leaveDto);
    console.log('leave:', leave);
    //save entity
    let res = await this.leaveRepository.save(leave);
    console.log('res:', res);

    return res;
  }

  async update(leaveId: string, leaveDto: LeaveDto) {
    const leave = await this.leaveRepository.findOne({
      where: { leaveId },
    });
    const leaveUpdate = {
      ...leave,
      ...leaveDto,
    };
    return await this.leaveRepository.save(leaveUpdate);
  }

  async delete(leaveId: string) {
    const leave = await this.leaveRepository.findOne({
      where: { leaveId },
    });
    return await this.leaveRepository.remove(leave);
  }
}
