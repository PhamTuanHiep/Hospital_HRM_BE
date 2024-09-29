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
import { DescriptionEvaluateService } from './descriptionOfEvaluate.service';
import { DescriptionEvaluate } from 'src/models/descriptionOfEvaluate.model';
import { DescriptionEvaluateDto } from 'src/dto/descriptionOfEvaluate.dto';

@Controller('description-evaluates')
export class DescriptionEvaluateControllers {
  constructor(private descriptionEvaluateService: DescriptionEvaluateService) {}

  @Get()
  async findAll(): Promise<ResponseData<DescriptionEvaluate[]>> {
    try {
      return new ResponseData<DescriptionEvaluate[]>(
        await this.descriptionEvaluateService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<DescriptionEvaluate[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:descriptionEvaluateId')
  async findOne(
    @Param('descriptionEvaluateId', ParseIntPipe) descriptionEvaluateId: number,
  ): Promise<ResponseData<DescriptionEvaluate>> {
    try {
      return new ResponseData<DescriptionEvaluate>(
        await this.descriptionEvaluateService.findOne(descriptionEvaluateId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<DescriptionEvaluate>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createRole(
    @Body(new ValidationPipe()) descriptionEvaluateDto: DescriptionEvaluateDto,
  ): Promise<ResponseData<DescriptionEvaluate>> {
    let errCode: number;
    let errMessage: string;
    try {
      let descriptionEvaluate = await this.descriptionEvaluateService.create(
        descriptionEvaluateDto,
      );
      if (!descriptionEvaluate) {
        (errCode = HttpStatus.NOT_FOUND), (errMessage = HttpMessage.NOT_FOUND);
      }
      console.log('descriptionEvaluate:', descriptionEvaluate);
      return new ResponseData<DescriptionEvaluate>(
        descriptionEvaluate,
        errCode || HttpStatus.SUCCESS,
        errMessage || HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<DescriptionEvaluate>(
        null,
        HttpStatus.ERROR_SERVER,
        HttpMessage.ERROR_SERVER,
      );
    }
  }

  @Put('/:descriptionEvaluateId')
  async update(
    @Param('descriptionEvaluateId', ParseIntPipe) descriptionEvaluateId: number,
    @Body() descriptionEvaluateDto: DescriptionEvaluateDto,
  ): Promise<ResponseData<DescriptionEvaluate>> {
    try {
      let data = await this.descriptionEvaluateService.update(
        descriptionEvaluateId,
        descriptionEvaluateDto,
      );
      return new ResponseData<DescriptionEvaluate>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<DescriptionEvaluate>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:descriptionEvaluateId')
  async delete(
    @Param('descriptionEvaluateId', ParseIntPipe) descriptionEvaluateId: number,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.descriptionEvaluateService.delete(descriptionEvaluateId))
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
