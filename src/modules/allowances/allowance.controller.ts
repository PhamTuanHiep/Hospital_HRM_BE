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

import { AllowanceService } from './allowance.service';
import { AllowanceDto } from 'src/dto/allowance.dto';
import { FilterDto } from 'src/dto/common.filter.dto';

@Controller('allowances')
export class AllowanceControllers {
  constructor(private allowanceService: AllowanceService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    console.log('query:', query);
    return this.allowanceService.findAll(query);
  }

  @Get('/:allowanceId')
  findOne(@Param('allowanceId') allowanceId: string): Promise<any> {
    return this.allowanceService.findOne(allowanceId);
  }

  @Post()
  async create(@Body(new ValidationPipe()) allowanceDto: AllowanceDto) {
    return this.allowanceService.create(allowanceDto);
  }

  @Put('/:allowanceId')
  async update(
    @Param('allowanceId') allowanceId: string,
    @Body() allowanceDto: AllowanceDto,
  ): Promise<any> {
    return this.allowanceService.update(allowanceId, allowanceDto);
  }

  @Delete('/:allowanceId')
  async delete(@Param('allowanceId') allowanceId: string): Promise<any> {
    return this.allowanceService.delete(allowanceId);
  }
}
