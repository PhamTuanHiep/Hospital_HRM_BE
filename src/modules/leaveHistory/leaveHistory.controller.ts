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

import { LeaveHistoryService } from './leaveHistory.service';
import { FilterDto } from 'src/dto/common.filter.dto';
import { LeaveHistoryDto } from 'src/dto/leaveHistory.dto';

@Controller('leave-histories')
export class LeaveHistoryControllers {
  constructor(private leaveHistoryService: LeaveHistoryService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.leaveHistoryService.findAll(query);
  }

  @Get('/:leaveHistoryId')
  findOne(
    @Param('leaveHistoryId', ParseIntPipe) leaveHistoryId: number,
  ): Promise<any> {
    return this.leaveHistoryService.findOne(Number(leaveHistoryId));
  }

  @Post()
  async create(@Body(new ValidationPipe()) leaveHistoryDto: LeaveHistoryDto) {
    return this.leaveHistoryService.create(leaveHistoryDto);
  }

  @Put('/:leaveHistoryId')
  async update(
    @Param('leaveHistoryId', ParseIntPipe) leaveHistoryId: number,
    @Body() leaveHistoryDto: LeaveHistoryDto,
  ): Promise<any> {
    return this.leaveHistoryService.update(leaveHistoryId, leaveHistoryDto);
  }

  @Delete('/:leaveHistoryId')
  async delete(
    @Param('leaveHistoryId', ParseIntPipe) leaveHistoryId: number,
  ): Promise<any> {
    return this.leaveHistoryService.delete(leaveHistoryId);
  }
}
