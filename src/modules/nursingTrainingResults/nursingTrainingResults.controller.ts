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
import { NursingTrainingResultsService } from './nursingTrainingResults.service';
import { NursingTrainingResults } from 'src/models/nursingTrainingResults.model';
import { NursingTrainingResultsDto } from 'src/dto/nursingTrainingResults.dto';

@Controller('nursing-training-results')
export class NursingTrainingResultsControllers {
  constructor(
    private nursingTrainingResultsService: NursingTrainingResultsService,
  ) {}

  @Get()
  async findAll(): Promise<ResponseData<NursingTrainingResults[]>> {
    try {
      return new ResponseData<NursingTrainingResults[]>(
        await this.nursingTrainingResultsService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<NursingTrainingResults[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:trainingResultsId')
  async findOne(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
  ): Promise<ResponseData<NursingTrainingResults>> {
    try {
      return new ResponseData<NursingTrainingResults>(
        await this.nursingTrainingResultsService.findOne(trainingResultsId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<NursingTrainingResults>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe())
    nursingTrainingResultsDto: NursingTrainingResultsDto,
  ): Promise<ResponseData<NursingTrainingResults>> {
    let errCode: number;
    let errMessage: string;
    try {
      let nursingTrainingResults =
        await this.nursingTrainingResultsService.create(
          nursingTrainingResultsDto,
        );
      if (!nursingTrainingResults) {
        (errCode = HttpStatus.NOT_FOUND), (errMessage = HttpMessage.NOT_FOUND);
      }

      return new ResponseData<NursingTrainingResults>(
        nursingTrainingResults,
        errCode || HttpStatus.SUCCESS,
        errMessage || HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<NursingTrainingResults>(
        null,
        HttpStatus.ERROR_SERVER,
        HttpMessage.ERROR_SERVER,
      );
    }
  }

  @Put('/:trainingResultsId')
  async update(
    @Param('trainingResultsId', ParseIntPipe) trainingResultsId: number,
    @Body() nursingTrainingResultsDto: NursingTrainingResultsDto,
  ): Promise<ResponseData<NursingTrainingResults>> {
    try {
      let data = await this.nursingTrainingResultsService.update(
        trainingResultsId,
        nursingTrainingResultsDto,
      );
      return new ResponseData<NursingTrainingResults>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<NursingTrainingResults>(
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
        (await this.nursingTrainingResultsService.delete(trainingResultsId))
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
