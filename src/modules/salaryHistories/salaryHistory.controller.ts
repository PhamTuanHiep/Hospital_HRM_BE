import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FilterDto } from 'src/dto/common.filter.dto';
import { SalaryHistoryService } from './salaryHistory.service';
import { SalaryHistoryDto } from 'src/dto/salaryHistory.dto';

@Controller('salary-histories')
export class SalaryHistoryControllers {
  constructor(private salaryHistoryService: SalaryHistoryService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.salaryHistoryService.findAll(query);
  }

  @Get('/:salaryHistoryId')
  findOne(
    @Param('salaryHistoryId', ParseIntPipe) salaryHistoryId: number,
  ): Promise<any> {
    return this.salaryHistoryService.findOne(salaryHistoryId);
  }

  @Post()
  async create(@Body(new ValidationPipe()) salaryHistoryDto: SalaryHistoryDto) {
    return this.salaryHistoryService.create(salaryHistoryDto);
  }

  @Put('/:salaryHistoryId')
  async update(
    @Param('salaryHistoryId', ParseIntPipe) salaryHistoryId: number,
    @Body() salaryHistoryDto: SalaryHistoryDto,
  ): Promise<any> {
    return this.salaryHistoryService.update(salaryHistoryId, salaryHistoryDto);
  }

  @Delete('/:salaryHistoryId')
  async delete(
    @Param('salaryHistoryId', ParseIntPipe) salaryHistoryId: number,
  ): Promise<any> {
    return this.salaryHistoryService.delete(salaryHistoryId);
  }
}
