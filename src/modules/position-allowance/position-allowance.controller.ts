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
import { PositionAllowanceService } from './position-allowance.service';
import { PositionAllowanceEntity } from 'src/entities/position-allowance.entity';
import { PositionAllowanceDto } from 'src/dto/position-allowance.dto';

@Controller('position_allowance')
export class PositionAllowanceControllers {
  constructor(private positionAllowanceService: PositionAllowanceService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.positionAllowanceService.findAll(query);
  }

  @Get('/:id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PositionAllowanceEntity> {
    return this.positionAllowanceService.findOne(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) positionAllowanceDto: PositionAllowanceDto,
  ) {
    return this.positionAllowanceService.create(positionAllowanceDto);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() positionAllowanceDto: PositionAllowanceDto,
  ): Promise<any> {
    return this.positionAllowanceService.update(id, positionAllowanceDto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.positionAllowanceService.delete(id);
  }
}
