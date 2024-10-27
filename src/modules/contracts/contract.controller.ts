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
import { FilterDto } from 'src/dto/common.filter.dto';
import { ContractDto } from 'src/dto/contract.dto';
import { ContractService } from './contract.service';

@Controller('contracts')
export class ContractControllers {
  constructor(private contractService: ContractService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.contractService.findAll(query);
  }

  @Get('/:contractId')
  async findOne(@Param('contractId') contractId: string): Promise<any> {
    return this.contractService.findOne(contractId);
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) contractDto: ContractDto,
  ): Promise<any> {
    return this.contractService.create(contractDto);
  }

  @Put('/:contractId')
  async update(
    @Param('contractId') contractId: string,
    @Body() contractDto: ContractDto,
  ): Promise<any> {
    return this.contractService.update(contractId, contractDto);
  }

  @Delete('/:contractId')
  async delete(@Param('contractId') contractId: string): Promise<any> {
    return this.contractService.delete(contractId);
  }
}
