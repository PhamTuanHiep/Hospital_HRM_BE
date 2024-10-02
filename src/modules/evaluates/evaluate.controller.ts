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
import { EvaluateService } from './evaluate.service';
import { Evaluate } from 'src/models/evaluate.model';
import { EvaluateDto } from 'src/dto/evaluate.dto';

@Controller('evaluates')
export class EvaluateControllers {
  constructor(private evaluateService: EvaluateService) {}

  @Get()
  async findAll(): Promise<ResponseData<Evaluate[]>> {
    try {
      return new ResponseData<Evaluate[]>(
        await this.evaluateService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Evaluate[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:evaluateId')
  async findOne(
    @Param('evaluateId', ParseIntPipe) evaluateId: number,
  ): Promise<ResponseData<Evaluate>> {
    try {
      return new ResponseData<Evaluate>(
        await this.evaluateService.findOne(evaluateId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Evaluate>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // @Post()
  // async create(
  //   @Body(new ValidationPipe()) evaluateDto: EvaluateDto,
  // ): Promise<ResponseData<EvaluateDto>> {
  //   try {
  //     let data = await this.evaluateService.create(evaluateDto);
  //     console.log('data:', data);
  //     return new ResponseData<Evaluate>(
  //       data,
  //       HttpStatus.SUCCESS,
  //       HttpMessage.SUCCESS,
  //     );
  //   } catch (e) {
  //     return new ResponseData<Evaluate>(
  //       null,
  //       HttpStatus.ERROR,
  //       HttpMessage.ERROR,
  //     );
  //   }
  // }

  @Post()
  async create(
    @Body(new ValidationPipe()) evaluateDto: EvaluateDto,
  ): Promise<ResponseData<Evaluate>> {
    let errCode: number;
    let errMessage: string;
    try {
      let evaluate = await this.evaluateService.create(evaluateDto);
      if (!evaluate) {
        (errCode = HttpStatus.NOT_FOUND), (errMessage = HttpMessage.NOT_FOUND);
      }
      console.log('evaluate:', evaluate);
      return new ResponseData<Evaluate>(
        evaluate,
        errCode || HttpStatus.SUCCESS,
        errMessage || HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Evaluate>(
        null,
        HttpStatus.ERROR_SERVER,
        HttpMessage.ERROR_SERVER,
      );
    }
  }

  @Put('/:evaluateId')
  async update(
    @Param('evaluateId', ParseIntPipe) evaluateId: number,
    @Body() evaluateDto: EvaluateDto,
  ): Promise<ResponseData<Evaluate>> {
    try {
      let data = await this.evaluateService.update(evaluateId, evaluateDto);
      return new ResponseData<Evaluate>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Evaluate>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:evaluateId')
  async delete(
    @Param('evaluateId', ParseIntPipe) evaluateId: number,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.evaluateService.delete(evaluateId)) ? true : false,
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
