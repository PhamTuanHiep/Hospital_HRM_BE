import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilterContractHistoriesDto } from 'src/dto/common.filter.dto';
import { ContractHistoryDto } from 'src/dto/contractHistory.dto';
import { ContractEntity } from 'src/entities/contract.entity';
import { ContractHistoryEntity } from 'src/entities/contractHistory.entity';
import { UserEntity } from 'src/entities/user.entity';
import { filterGetContractHistories } from 'src/repositories/contractHistories.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ContractHistoryService {
  constructor(
    @InjectRepository(ContractHistoryEntity)
    private contractHistoryRepository: Repository<ContractHistoryEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ContractEntity)
    private contractRepository: Repository<ContractEntity>,
  ) {}

  async findAll(query: FilterContractHistoriesDto): Promise<any> {
    const repository = this.contractHistoryRepository;
    return filterGetContractHistories({
      query,
      repository,
    });
  }

  async findOne(
    contractHistoryId: number,
  ): Promise<ContractHistoryEntity | null> {
    return await this.contractHistoryRepository.findOne({
      where: { contractHistoryId },
      relations: ['contract', 'user'],
      select: {
        contractHistoryId: true,
        createdAt: true,
        updatedAt: true,
        startDay: true,
        endDay: true,
        note: true,
        suspensionTime: true,
        status: true,
        contract: {
          contractId: true,
          contractNameVI: true,
          contractNameEN: true,
          note: true,
        },
        user: {
          userId: true,
          fullName: true,
        },
      },
    });
  }

  async create(contractHistoryDto: ContractHistoryDto): Promise<any> {
    const { userId, contractId, ...contractHistory } = contractHistoryDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });
      const contract = await this.contractRepository.findOneBy({
        contractId,
      });

      const newContractHistory =
        this.contractHistoryRepository.create(contractHistory);
      newContractHistory.user = user;
      newContractHistory.contract = contract;

      const res = await this.contractHistoryRepository.save(newContractHistory);

      return await this.contractHistoryRepository.findOne({
        where: { contractHistoryId: res.contractHistoryId },
        relations: ['contract', 'user'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    contractHistoryId: number,
    contractHistoryDto: ContractHistoryDto,
  ): Promise<UpdateResult> {
    return await this.contractHistoryRepository.update(
      contractHistoryId,
      contractHistoryDto,
    );
  }

  async updateAll(
    contractHistoriesDto: ContractHistoryDto[],
  ): Promise<UpdateResult[]> {
    console.log('contractHistoriesDto:', contractHistoriesDto);
    const updatePromises = contractHistoriesDto.map((contractHistory) =>
      this.contractHistoryRepository.update(contractHistory.contractHistoryId, {
        status: contractHistory.status,
      }),
    );

    return await Promise.all(updatePromises);
  }

  async delete(contractHistoryId: number): Promise<DeleteResult> {
    return await this.contractHistoryRepository.delete(contractHistoryId);
  }
}
