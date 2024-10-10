import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from 'src/dto/department.dto';
import { FilterDto } from 'src/dto/common.filter.dto';

@Controller('departments')
export class DepartmentControllers {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.departmentService.findAll(query);
  }

  @Get('/:departmentId')
  async findOne(@Param('departmentId') departmentId: string): Promise<any> {
    return this.departmentService.findOne(departmentId);
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) departmentDto: DepartmentDto,
  ): Promise<any> {
    return this.departmentService.create(departmentDto);
  }

  @Put('/:departmentId')
  async update(
    @Param('departmentId') departmentId: string,
    @Body() departmentDto: DepartmentDto,
  ): Promise<any> {
    return this.departmentService.update(departmentId, departmentDto);
  }

  @Delete('/:departmentId')
  async delete(@Param('departmentId') departmentId: string): Promise<any> {
    return this.departmentService.delete(departmentId);
  }
}
