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
import { ContractHistoryDto } from 'src/dto/contractHistory.dto';
import { ContractHistoryService } from './contractHistory.service';

@Controller('contract-histories')
export class ContractHistoryControllers {
  constructor(private contractHistoryService: ContractHistoryService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    console.log('query:', query);
    return this.contractHistoryService.findAll(query);
  }

  @Get('/:contractHistoryId')
  findOne(
    @Param('contractHistoryId', ParseIntPipe) contractHistoryId: number,
  ): Promise<any> {
    return this.contractHistoryService.findOne(contractHistoryId);
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) contractHistoryDto: ContractHistoryDto,
  ) {
    return this.contractHistoryService.create(contractHistoryDto);
  }

  @Put('/:contractHistoryId')
  async update(
    @Param('contractHistoryId', ParseIntPipe) contractHistoryId: number,
    @Body() contractHistoryDto: ContractHistoryDto,
  ): Promise<any> {
    return this.contractHistoryService.update(
      contractHistoryId,
      contractHistoryDto,
    );
  }

  @Put()
  async updateAll(
    @Body() contractHistoriesDto: ContractHistoryDto[],
  ): Promise<any> {
    return this.contractHistoryService.updateAll(contractHistoriesDto);
  }

  @Delete('/:contractHistoryId')
  async delete(
    @Param('contractHistoryId', ParseIntPipe) contractHistoryId: number,
  ): Promise<any> {
    return this.contractHistoryService.delete(contractHistoryId);
  }
}
