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
import { AllowanceService } from './allowance.service';
import { Allowance } from 'src/models/allowance.model';
import { AllowanceDto } from 'src/dto/allowance.dto';

@Controller('allowances')
export class AllowanceControllers {
  constructor(private allowanceService: AllowanceService) {}

  @Get()
  async findAll(): Promise<ResponseData<Allowance[]>> {
    try {
      return new ResponseData<Allowance[]>(
        await this.allowanceService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Allowance[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:allowanceId')
  async findOne(
    @Param('allowanceId') allowanceId: string,
  ): Promise<ResponseData<Allowance>> {
    try {
      return new ResponseData<Allowance>(
        await this.allowanceService.findOne(allowanceId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Allowance>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createRole(
    @Body(new ValidationPipe()) allowanceDto: AllowanceDto,
  ): Promise<ResponseData<AllowanceDto>> {
    try {
      let data = await this.allowanceService.createRole(allowanceDto);
      console.log('data:', data);
      return new ResponseData<Allowance>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Allowance>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put('/:allowanceId')
  async update(
    @Param('allowanceId') allowanceId: string,
    @Body() allowanceDto: AllowanceDto,
  ): Promise<ResponseData<Allowance>> {
    try {
      let data = await this.allowanceService.update(allowanceId, allowanceDto);
      return new ResponseData<Allowance>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Allowance>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:allowanceId')
  async delete(
    @Param('allowanceId') allowanceId: string,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.allowanceService.delete(allowanceId)) ? true : false,
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
