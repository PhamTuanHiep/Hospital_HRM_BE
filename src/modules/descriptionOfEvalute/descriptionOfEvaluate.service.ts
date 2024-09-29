import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toCamelCase } from 'src/common/common.helper';
import { DescriptionEvaluateDto } from 'src/dto/descriptionOfEvaluate.dto';
import { DescriptionEvaluateEntity } from 'src/entities/descriptionOfEvaluate.entity';
import { DescriptionEvaluate } from 'src/models/descriptionOfEvaluate.model';
import { Repository } from 'typeorm';

@Injectable()
export class DescriptionEvaluateService {
  constructor(
    @InjectRepository(DescriptionEvaluateEntity)
    private descriptionEvaluateRepository: Repository<DescriptionEvaluateEntity>,
  ) {}

  async findAll() {
    return await this.descriptionEvaluateRepository.find();
  }

  async findOne(
    descriptionEvaluateId: number,
  ): Promise<DescriptionEvaluate | null> {
    return await this.descriptionEvaluateRepository.findOne({
      where: { descriptionEvaluateId },
    });
  }

  async create(descriptionEvaluateDto: DescriptionEvaluateDto) {
    const descriptionEvaluate = this.descriptionEvaluateRepository.create(
      descriptionEvaluateDto,
    );
    //save entity
    let res =
      await this.descriptionEvaluateRepository.save(descriptionEvaluate);

    return res;
  }

  async update(
    descriptionEvaluateId: number,
    descriptionEvaluateDto: DescriptionEvaluateDto,
  ) {
    const evaluate = await this.descriptionEvaluateRepository.findOne({
      where: { descriptionEvaluateId },
    });
    const evaluateUpdate = {
      ...evaluate,
      ...descriptionEvaluateDto,
    };
    return await this.descriptionEvaluateRepository.save(evaluateUpdate);
  }

  async delete(descriptionEvaluateId: number) {
    const descriptionEvaluate =
      await this.descriptionEvaluateRepository.findOne({
        where: { descriptionEvaluateId },
      });
    return await this.descriptionEvaluateRepository.remove(descriptionEvaluate);
  }
}
