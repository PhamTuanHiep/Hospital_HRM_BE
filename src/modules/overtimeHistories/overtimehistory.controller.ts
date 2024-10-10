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
import { OvertimeHistoryDto } from 'src/dto/overtimeHistory.dto';

import { OvertimeHistoryService } from './overtimehistory.service';
import { FilterDto } from 'src/dto/common.filter.dto';

@Controller('overtime-histories')
export class OvertimeHistoryControllers {
  constructor(private overtimeHistoryService: OvertimeHistoryService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.overtimeHistoryService.findAll(query);
  }

  @Get('/:overtimeHistoryId')
  findOne(
    @Param('overtimeHistoryId', ParseIntPipe) overtimeHistoryId: number,
  ): Promise<any> {
    return this.overtimeHistoryService.findOne(overtimeHistoryId);
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) overtimeHistoryDto: OvertimeHistoryDto,
  ) {
    return this.overtimeHistoryService.create(overtimeHistoryDto);
  }

  @Put('/:overtimeHistoryId')
  async update(
    @Param('overtimeHistoryId') overtimeHistoryId: number,
    @Body() overtimeHistoryDto: OvertimeHistoryDto,
  ): Promise<any> {
    return this.overtimeHistoryService.update(
      overtimeHistoryId,
      overtimeHistoryDto,
    );
  }

  @Delete('/:overtimeHistoryId')
  async delete(
    @Param('overtimeHistoryId') leaveHistoryId: number,
  ): Promise<any> {
    return this.overtimeHistoryService.delete(leaveHistoryId);
  }
}
