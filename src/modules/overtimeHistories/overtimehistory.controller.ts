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
import { OvertimeHistoryDto } from 'src/dto/overtimeHistory.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { OvertimeHistory } from 'src/models/overtimeHistory.model';
import { OvertimeHistoryService } from './overtimehistory.service';

@Controller('overtime-histories')
export class OvertimeHistoryControllers {
  constructor(private overtimeHistoryService: OvertimeHistoryService) {}

  @Get()
  async findAll(): Promise<ResponseData<OvertimeHistory[]>> {
    try {
      return new ResponseData<OvertimeHistory[]>(
        await this.overtimeHistoryService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<OvertimeHistory[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:overtimeHistoryId')
  async findOne(
    @Param('overtimeHistoryId', ParseIntPipe) overtimeHistoryId: number,
  ): Promise<ResponseData<OvertimeHistory>> {
    try {
      return new ResponseData<OvertimeHistory>(
        await this.overtimeHistoryService.findOne(overtimeHistoryId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<OvertimeHistory>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) overtimeHistoryDto: OvertimeHistoryDto,
  ): Promise<ResponseData<OvertimeHistory>> {
    try {
      let data = await this.overtimeHistoryService.create(overtimeHistoryDto);
      return new ResponseData<OvertimeHistory>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<OvertimeHistory>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put('/:overtimeHistoryId')
  async update(
    @Param('overtimeHistoryId', ParseIntPipe) overtimeHistoryId: number,
    @Body() overtimeHistoryDto: OvertimeHistoryDto,
  ): Promise<ResponseData<OvertimeHistory>> {
    try {
      let data = await this.overtimeHistoryService.update(
        overtimeHistoryId,
        overtimeHistoryDto,
      );
      return new ResponseData<OvertimeHistory>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<OvertimeHistory>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:overtimeHistoryId')
  async delete(
    @Param('overtimeHistoryId', ParseIntPipe) overtimeHistoryId: number,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.overtimeHistoryService.delete(overtimeHistoryId))
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
