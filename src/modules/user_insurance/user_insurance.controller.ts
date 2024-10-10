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

import { UserInsuranceService } from './user_insurance.service';
import { FilterDto } from 'src/dto/common.filter.dto';
import { UserInsuranceEntity } from 'src/entities/user-insurance.entity';
import { UserInsuranceDto } from 'src/dto/user-insurance.dto';

@Controller('user_insurance')
export class UserInsuranceControllers {
  constructor(private userInsuranceService: UserInsuranceService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.userInsuranceService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userInsuranceService.findOne(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) userInsuranceDto: UserInsuranceDto) {
    return this.userInsuranceService.create(userInsuranceDto);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userInsuranceDto: UserInsuranceDto,
  ): Promise<any> {
    return this.userInsuranceService.update(id, userInsuranceDto);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userInsuranceService.delete(id);
  }
}
