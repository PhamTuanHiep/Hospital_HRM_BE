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
import { FilterDto } from 'src/dto/common.filter.dto';
import { NursingTrainingResultsService } from './nursingTrainingResults.service';
import { NursingTrainingResultsDto } from 'src/dto/nursingTrainingResults.dto';

@Controller('medical-training-results')
export class NursingTrainingResultsControllers {
  constructor(
    private nursingTrainingResultsService: NursingTrainingResultsService,
  ) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.nursingTrainingResultsService.findAll(query);
  }

  @Get('/:trainingResultsId')
  findOne(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
  ): Promise<any> {
    return this.nursingTrainingResultsService.findOne(trainingResultsId);
  }

  @Post()
  async create(
    @Body(new ValidationPipe())
    nursingTrainingResultsDto: NursingTrainingResultsDto,
  ) {
    return this.nursingTrainingResultsService.create(nursingTrainingResultsDto);
  }

  @Put('/:trainingResultsId')
  async update(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
    @Body() nursingTrainingResultsDto: NursingTrainingResultsDto,
  ): Promise<any> {
    return this.nursingTrainingResultsService.update(
      trainingResultsId,
      nursingTrainingResultsDto,
    );
  }

  @Delete('/:trainingResultsId')
  async delete(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
  ): Promise<any> {
    return this.nursingTrainingResultsService.delete(trainingResultsId);
  }
}
