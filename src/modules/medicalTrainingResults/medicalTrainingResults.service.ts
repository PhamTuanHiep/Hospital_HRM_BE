import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalTrainingResultsDto } from 'src/dto/medicalTrainingResults.dto';
import { MedicalTrainingResultsEntity } from 'src/entities/medicalTrainingResults.entity';
import { MedicalTrainingResults } from 'src/models/medicalTrainingResults.model';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalTrainingResultsService {
  constructor(
    @InjectRepository(MedicalTrainingResultsEntity)
    private medicalTrainingResultsEntityRepository: Repository<MedicalTrainingResultsEntity>,
  ) {}
  async findAll() {
    return await this.medicalTrainingResultsEntityRepository.find();
  }

  async findOne(
    trainingResultsId: number,
  ): Promise<MedicalTrainingResults | null> {
    return await this.medicalTrainingResultsEntityRepository.findOne({
      where: { trainingResultsId },
    });
  }

  async create(medicalTrainingResultsDto: MedicalTrainingResultsDto) {
    const medicalTrainingResult =
      this.medicalTrainingResultsEntityRepository.create(
        medicalTrainingResultsDto,
      );
    //save entity
    let res = await this.medicalTrainingResultsEntityRepository.save(
      medicalTrainingResult,
    );
    return res;
  }

  async update(
    trainingResultsId: number,
    medicalTrainingResultsDto: MedicalTrainingResultsDto,
  ) {
    const medicalTrainingResults =
      await this.medicalTrainingResultsEntityRepository.findOne({
        where: { trainingResultsId },
      });
    const medicalTrainingResultsUpdate = {
      ...medicalTrainingResults,
      ...medicalTrainingResultsDto,
    };
    return await this.medicalTrainingResultsEntityRepository.save(
      medicalTrainingResultsUpdate,
    );
  }

  async delete(trainingResultsId: number) {
    const medicalTrainingResults =
      await this.medicalTrainingResultsEntityRepository.findOne({
        where: { trainingResultsId },
      });
    return await this.medicalTrainingResultsEntityRepository.remove(
      medicalTrainingResults,
    );
  }
}
