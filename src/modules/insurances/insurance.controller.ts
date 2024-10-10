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
import { InsuranceService } from './insurance.service';
import { InsuranceDto } from 'src/dto/insurance.dto';
import { FilterDto } from 'src/dto/common.filter.dto';

@Controller('insurances')
export class InsuranceControllers {
  constructor(private insuranceService: InsuranceService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.insuranceService.findAll(query);
  }

  @Get('/:insuranceId')
  findOne(@Param('insuranceId') insuranceId: string): Promise<any> {
    return this.insuranceService.findOne(insuranceId);
  }

  @Post()
  async create(@Body(new ValidationPipe()) insuranceDto: InsuranceDto) {
    return this.insuranceService.create(insuranceDto);
  }

  @Put('/:insuranceId')
  async update(
    @Param('insuranceId') insuranceId: string,
    @Body() insuranceDto: InsuranceDto,
  ): Promise<any> {
    return this.insuranceService.update(insuranceId, insuranceDto);
  }

  @Delete('/:insuranceId')
  async delete(@Param('insuranceId') insuranceId: string): Promise<any> {
    return this.insuranceService.delete(insuranceId);
  }
}
