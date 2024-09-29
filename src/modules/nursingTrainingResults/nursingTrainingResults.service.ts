import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NursingTrainingResultsDto } from 'src/dto/nursingTrainingResults.dto';
import { NursingTrainingResultsEntity } from 'src/entities/nursingTrainingResults.entity';

import { Repository } from 'typeorm';

@Injectable()
export class NursingTrainingResultsService {
  constructor(
    @InjectRepository(NursingTrainingResultsEntity)
    private nursingTrainingResultsEntityRepository: Repository<NursingTrainingResultsEntity>,
  ) {}
  async findAll() {
    return await this.nursingTrainingResultsEntityRepository.find();
  }

  async findOne(
    trainingResultsId: number,
  ): Promise<NursingTrainingResultsEntity | null> {
    return await this.nursingTrainingResultsEntityRepository.findOne({
      where: { trainingResultsId },
    });
  }

  async create(nursingTrainingResultsDto: NursingTrainingResultsDto) {
    const nursingTrainingResult =
      this.nursingTrainingResultsEntityRepository.create(
        nursingTrainingResultsDto,
      );
    //save entity
    let res = await this.nursingTrainingResultsEntityRepository.save(
      nursingTrainingResult,
    );
    return res;
  }

  async update(
    trainingResultsId: number,
    nursingTrainingResultsDto: NursingTrainingResultsDto,
  ) {
    const nursingTrainingResults =
      await this.nursingTrainingResultsEntityRepository.findOne({
        where: { trainingResultsId },
      });
    const nursingTrainingResultsUpdate = {
      ...nursingTrainingResults,
      ...nursingTrainingResultsDto,
    };
    return await this.nursingTrainingResultsEntityRepository.save(
      nursingTrainingResultsUpdate,
    );
  }

  async delete(trainingResultsId: number) {
    const nursingTrainingResults =
      await this.nursingTrainingResultsEntityRepository.findOne({
        where: { trainingResultsId },
      });
    return await this.nursingTrainingResultsEntityRepository.remove(
      nursingTrainingResults,
    );
  }
}
