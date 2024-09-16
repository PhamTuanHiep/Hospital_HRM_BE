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
import { DepartmentService } from './department.service';
import { Department } from 'src/models/department.model';
import { DepartmentDto } from 'src/dto/department.dto';

@Controller('departments')
export class DepartmentControllers {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  async findAll(): Promise<ResponseData<Department[]>> {
    try {
      return new ResponseData<Department[]>(
        await this.departmentService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Department[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:departmentId')
  async findOne(
    @Param('departmentId') departmentId: string,
  ): Promise<ResponseData<Department>> {
    try {
      return new ResponseData<Department>(
        await this.departmentService.findOne(departmentId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Department>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createRole(
    @Body(new ValidationPipe()) departmentDto: DepartmentDto,
  ): Promise<ResponseData<DepartmentDto>> {
    try {
      let data = await this.departmentService.createRole(departmentDto);
      console.log('data:', data);
      return new ResponseData<Department>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Department>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put('/:departmentId')
  async update(
    @Param('departmentId') departmentId: string,
    @Body() departmentDto: DepartmentDto,
  ): Promise<ResponseData<Department>> {
    try {
      let data = await this.departmentService.update(
        departmentId,
        departmentDto,
      );
      return new ResponseData<Department>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Department>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:departmentId')
  async delete(
    @Param('departmentId') departmentId: string,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.departmentService.delete(departmentId)) ? true : false,
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
