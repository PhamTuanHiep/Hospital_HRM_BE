import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { ContractDto } from 'src/dto/contract.dto';
import { ContractEntity } from 'src/entities/contract.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private contractRepository: Repository<ContractEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.contractRepository;
    const relations: Relations<string> = {
      contractHistories: true,
    };
    const select: any = {
      contractHistories: true,
    };
    const order = { contractId: 'ASC' };

    return filterGetAll({ query, repository, relations, select, order });
  }

  async findOne(contractId: string): Promise<ContractEntity | null> {
    return await this.contractRepository.findOne({
      where: { contractId },
      relations: ['contractHistories'],
      select: {
        contractHistories: true,
      },
    });
  }

  async create(contractDto: ContractDto) {
    try {
      const newContract = this.contractRepository.create(contractDto);
      const res = await this.contractRepository.save(newContract);

      return await this.contractRepository.findOne({
        where: { contractId: res.contractId },
        relations: ['contractHistories'],
        select: {
          contractHistories: true,
        },
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    contractId: string,
    contractDto: ContractDto,
  ): Promise<UpdateResult> {
    return await this.contractRepository.update(contractId, contractDto);
  }

  async delete(contractId: string): Promise<DeleteResult> {
    return await this.contractRepository.delete(contractId);
  }
}
