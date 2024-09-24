import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { OvertimeDto } from 'src/dto/overtime.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Overtime } from 'src/models/overtime.model';
import { OvertimeService } from './overtime.service';

@Controller('overtimes')
export class OvertimeControllers {
  constructor(private overtimeService: OvertimeService) {}

  @Get()
  async findAll(): Promise<ResponseData<Overtime[]>> {
    try {
      return new ResponseData<Overtime[]>(
        await this.overtimeService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Overtime[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:overtimeId')
  async findOne(
    @Param('overtimeId') overtimeId: string,
  ): Promise<ResponseData<Overtime>> {
    try {
      return new ResponseData<Overtime>(
        await this.overtimeService.findOne(overtimeId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Overtime>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) overtimeDto: OvertimeDto,
  ): Promise<ResponseData<OvertimeDto>> {
    try {
      let data = await this.overtimeService.create(overtimeDto);
      return new ResponseData<Overtime>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Overtime>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put('/:overtimeId')
  async update(
    @Param('overtimeId') overtimeId: string,
    @Body() overtimeDto: OvertimeDto,
  ): Promise<ResponseData<Overtime>> {
    try {
      let data = await this.overtimeService.update(overtimeId, overtimeDto);
      return new ResponseData<Overtime>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Overtime>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:overtimeId')
  async delete(
    @Param('overtimeId') overtimeId: string,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.overtimeService.delete(overtimeId)) ? true : false,
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
