import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/common/common.type';
import { filterGetAll } from 'src/common/common.use.helper';
import { FilterDto } from 'src/dto/common.filter.dto';
import { MedicalTrainingResultsDto } from 'src/dto/medicalTrainingResults.dto';
import { MedicalTrainingResultsEntity } from 'src/entities/medicalTrainingResults.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class MedicalTrainingResultsService {
  constructor(
    @InjectRepository(MedicalTrainingResultsEntity)
    private medicalTrainingResultsEntityRepository: Repository<MedicalTrainingResultsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: FilterDto): Promise<any> {
    const repository = this.medicalTrainingResultsEntityRepository;
    const relations: Relations<string> = {
      user: true,
    };

    return filterGetAll({ query, repository, relations });
  }

  async findOne(
    trainingResultsId: number,
  ): Promise<MedicalTrainingResultsEntity | null> {
    return await this.medicalTrainingResultsEntityRepository.findOne({
      where: { trainingResultsId },
      relations: ['user'],
    });
  }

  async create(
    medicalTrainingResultsDto: MedicalTrainingResultsDto,
  ): Promise<any> {
    const { userId, ...medicalTrainingResults } = medicalTrainingResultsDto;
    try {
      const user = await this.userRepository.findOneBy({ userId });

      const newMedicalTrainingResults =
        this.medicalTrainingResultsEntityRepository.create(
          medicalTrainingResults,
        );
      newMedicalTrainingResults.user = user;

      const res = await this.medicalTrainingResultsEntityRepository.save(
        newMedicalTrainingResults,
      );
      return await this.medicalTrainingResultsEntityRepository.findOne({
        where: { trainingResultsId: res.trainingResultsId },
        relations: ['user'],
      });
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    trainingResultsId: number,
    medicalTrainingResultsDto: MedicalTrainingResultsDto,
  ): Promise<UpdateResult> {
    const sum =
      medicalTrainingResultsDto.understandingOfMedicalTheory +
      medicalTrainingResultsDto.knowledgeOfTreatmentProtocols +
      medicalTrainingResultsDto.abilityToLearnNewKnowledge +
      medicalTrainingResultsDto.diagnosticSkills +
      medicalTrainingResultsDto.treatmentSkills +
      medicalTrainingResultsDto.decisionMakingSkills +
      medicalTrainingResultsDto.communicationSkillsWithPatientsAndTheirFamilies +
      medicalTrainingResultsDto.communicationSkillsWithColleagues +
      medicalTrainingResultsDto.patientMonitoringAndCare +
      medicalTrainingResultsDto.participationInMedicalResearch;
    const count = 10;
    const newAverageScore = sum / count;
    return await this.medicalTrainingResultsEntityRepository.update(
      trainingResultsId,
      { ...medicalTrainingResultsDto, averageScore: newAverageScore },
    );
  }

  async delete(trainingResultsId: number): Promise<DeleteResult> {
    return await this.medicalTrainingResultsEntityRepository.delete(
      trainingResultsId,
    );
  }
}
