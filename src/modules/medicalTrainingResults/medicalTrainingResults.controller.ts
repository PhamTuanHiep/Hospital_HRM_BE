import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { MedicalTrainingResultsService } from './medicalTrainingResults.service';
import { MedicalTrainingResultsDto } from 'src/dto/medicalTrainingResults.dto';
import { FilterDto } from 'src/dto/common.filter.dto';

@Controller('medical-training-results')
export class MedicalTrainingResultsControllers {
  constructor(
    private medicalTrainingResultsService: MedicalTrainingResultsService,
  ) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.medicalTrainingResultsService.findAll(query);
  }

  @Get('/:trainingResultsId')
  findOne(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
  ): Promise<any> {
    return this.medicalTrainingResultsService.findOne(trainingResultsId);
  }

  @Post()
  async create(
    @Body(new ValidationPipe())
    medicalTrainingResultsDto: MedicalTrainingResultsDto,
  ) {
    return this.medicalTrainingResultsService.create(medicalTrainingResultsDto);
  }

  @Put('/:trainingResultsId')
  async update(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
    @Body() medicalTrainingResultsDto: MedicalTrainingResultsDto,
  ): Promise<any> {
    return this.medicalTrainingResultsService.update(
      trainingResultsId,
      medicalTrainingResultsDto,
    );
  }

  @Delete('/:trainingResultsId')
  async delete(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
  ): Promise<any> {
    return this.medicalTrainingResultsService.delete(trainingResultsId);
  }
}
