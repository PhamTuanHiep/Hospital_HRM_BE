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
import { InsuranceService } from './insurance.service';
import { Insurance } from 'src/models/insurance.model';
import { InsuranceDto } from 'src/dto/insurance.dto';

@Controller('insurances')
export class InsuranceControllers {
  constructor(private insuranceService: InsuranceService) {}

  @Get()
  async findAll(): Promise<ResponseData<Insurance[]>> {
    try {
      return new ResponseData<Insurance[]>(
        await this.insuranceService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Insurance[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:insuranceId')
  async findOne(
    @Param('insuranceId') insuranceId: string,
  ): Promise<ResponseData<Insurance>> {
    try {
      return new ResponseData<Insurance>(
        await this.insuranceService.findOne(insuranceId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Insurance>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) insuranceDto: InsuranceDto,
  ): Promise<ResponseData<InsuranceDto>> {
    try {
      let data = await this.insuranceService.create(insuranceDto);
      console.log('data:', data);
      return new ResponseData<Insurance>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Insurance>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put('/:insuranceId')
  async update(
    @Param('insuranceId') insuranceId: string,
    @Body() insuranceDto: InsuranceDto,
  ): Promise<ResponseData<Insurance>> {
    try {
      let data = await this.insuranceService.update(insuranceId, insuranceDto);
      return new ResponseData<Insurance>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Insurance>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:insuranceId')
  async delete(
    @Param('insuranceId') insuranceId: string,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.insuranceService.delete(insuranceId)) ? true : false,
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
