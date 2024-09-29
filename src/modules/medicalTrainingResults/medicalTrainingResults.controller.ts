import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { MedicalTrainingResultsService } from './medicalTrainingResults.service';
import { MedicalTrainingResults } from 'src/models/medicalTrainingResults.model';
import { MedicalTrainingResultsDto } from 'src/dto/medicalTrainingResults.dto';

@Controller('medical-training-results')
export class MedicalTrainingResultsControllers {
  constructor(
    private medicalTrainingResultsService: MedicalTrainingResultsService,
  ) {}

  @Get()
  async findAll(): Promise<ResponseData<MedicalTrainingResults[]>> {
    try {
      return new ResponseData<MedicalTrainingResults[]>(
        await this.medicalTrainingResultsService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<MedicalTrainingResults[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:trainingResultsId')
  async findOne(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
  ): Promise<ResponseData<MedicalTrainingResults>> {
    try {
      return new ResponseData<MedicalTrainingResults>(
        await this.medicalTrainingResultsService.findOne(trainingResultsId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<MedicalTrainingResults>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe())
    medicalTrainingResultsDto: MedicalTrainingResultsDto,
  ): Promise<ResponseData<MedicalTrainingResultsDto>> {
    let errCode: number;
    let errMessage: string;
    try {
      let medicalTrainingResults =
        await this.medicalTrainingResultsService.create(
          medicalTrainingResultsDto,
        );
      if (!medicalTrainingResults) {
        (errCode = HttpStatus.NOT_FOUND), (errMessage = HttpMessage.NOT_FOUND);
      }

      return new ResponseData<MedicalTrainingResults>(
        medicalTrainingResults,
        errCode || HttpStatus.SUCCESS,
        errMessage || HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<MedicalTrainingResults>(
        null,
        HttpStatus.ERROR_SERVER,
        HttpMessage.ERROR_SERVER,
      );
    }
  }

  @Put('/:trainingResultsId')
  async update(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
    @Body() medicalTrainingResultsDto: MedicalTrainingResultsDto,
  ): Promise<ResponseData<MedicalTrainingResults>> {
    try {
      let data = await this.medicalTrainingResultsService.update(
        trainingResultsId,
        medicalTrainingResultsDto,
      );
      return new ResponseData<MedicalTrainingResults>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<MedicalTrainingResults>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:trainingResultsId')
  async delete(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.medicalTrainingResultsService.delete(trainingResultsId))
          ? true
          : false,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<boolean>(
        false,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
