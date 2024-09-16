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

import { PositionService } from './position.service';
import { Position } from 'src/models/position.model';
import { PositionDto } from 'src/dto/position.dto';

@Controller('positions')
export class PositionControllers {
  constructor(private postionService: PositionService) {}

  @Get()
  async findAll(): Promise<ResponseData<Position[]>> {
    try {
      return new ResponseData<Position[]>(
        await this.postionService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Position[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:positionId')
  async findOne(
    @Param('positionId') positionId: string,
  ): Promise<ResponseData<Position>> {
    try {
      return new ResponseData<Position>(
        await this.postionService.findOne(positionId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Position>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) positionDto: PositionDto,
  ): Promise<ResponseData<PositionDto>> {
    try {
      let data = await this.postionService.create(positionDto);
      console.log('data:', data);
      return new ResponseData<Position>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Position>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put('/:positionId')
  async update(
    @Param('positionId') positionId: string,
    @Body() positionDto: PositionDto,
  ): Promise<ResponseData<Position>> {
    try {
      let data = await this.postionService.update(positionId, positionDto);
      return new ResponseData<Position>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Position>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:positionId')
  async delete(
    @Param('positionId') positionId: string,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.postionService.delete(positionId)) ? true : false,
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
