import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluateDto } from 'src/dto/evaluate.dto';
import { EvaluateEntity } from 'src/entities/evaluate.entity';

import { Evaluate } from 'src/models/evaluate.model';

import { Repository } from 'typeorm';

@Injectable()
export class EvaluateService {
  constructor(
    @InjectRepository(EvaluateEntity)
    private evaluateRepository: Repository<EvaluateEntity>,
  ) {}

  async findAll() {
    return await this.evaluateRepository.find();
  }

  async findOne(evaluateId: number): Promise<Evaluate | null> {
    return await this.evaluateRepository.findOne({ where: { evaluateId } });
  }

  async create(evaluateDto: EvaluateDto) {
    const evaluate = this.evaluateRepository.create(evaluateDto);
    //save entity
    let res = await this.evaluateRepository.save(evaluate);

    return res;
  }

  async update(evaluateId: number, evaluateDto: EvaluateDto) {
    const evaluate = await this.evaluateRepository.findOne({
      where: { evaluateId },
    });
    const evaluateUpdate = {
      ...evaluate,
      ...evaluateDto,
    };
    return await this.evaluateRepository.save(evaluateUpdate);
  }

  async delete(evaluateId: number) {
    const evaluate = await this.evaluateRepository.findOne({
      where: { evaluateId },
    });
    return await this.evaluateRepository.remove(evaluate);
  }
}
