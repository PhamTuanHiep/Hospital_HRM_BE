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
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { LeaveService } from './leave.service';
import { Leave } from 'src/models/leave.model';
import { LeaveDto } from 'src/dto/leave.dto';

@Controller('leaves')
export class LeaveControllers {
  constructor(private leaveService: LeaveService) {}

  @Get()
  async findAll(): Promise<ResponseData<Leave[]>> {
    try {
      return new ResponseData<Leave[]>(
        await this.leaveService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Leave[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:leaveId')
  async findOne(
    @Param('leaveId') leaveId: string,
  ): Promise<ResponseData<Leave>> {
    try {
      return new ResponseData<Leave>(
        await this.leaveService.findOne(leaveId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Leave>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) leaveDto: LeaveDto,
  ): Promise<ResponseData<Leave>> {
    try {
      let data = await this.leaveService.create(leaveDto);
      console.log('data:', data);
      return new ResponseData<Leave>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Leave>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Put('/:leaveId')
  async update(
    @Param('leaveId') leaveId: string,
    @Body() leaveDto: LeaveDto,
  ): Promise<ResponseData<Leave>> {
    try {
      let data = await this.leaveService.update(leaveId, leaveDto);
      return new ResponseData<Leave>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Leave>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete('/:leaveId')
  async delete(
    @Param('leaveId') leaveId: string,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.leaveService.delete(leaveId)) ? true : false,
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
