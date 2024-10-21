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
import { EvaluateService } from './evaluate.service';
import { EvaluateDto } from 'src/dto/evaluate.dto';
import { FilterDto } from 'src/dto/common.filter.dto';

@Controller('evaluates')
export class EvaluateControllers {
  constructor(private evaluateService: EvaluateService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.evaluateService.findAll(query);
  }

  @Get('/:evaluateId')
  findOne(@Param('evaluateId', ParseIntPipe) evaluateId: number): Promise<any> {
    return this.evaluateService.findOne(evaluateId);
  }

  @Post()
  async create(@Body(new ValidationPipe()) evaluateDto: EvaluateDto) {
    return this.evaluateService.create(evaluateDto);
  }

  @Put('/:evaluateId')
  async update(
    @Param('evaluateId', ParseIntPipe) evaluateId: number,
    @Body() evaluateDto: EvaluateDto,
  ): Promise<any> {
    return this.evaluateService.update(evaluateId, evaluateDto);
  }

  @Delete('/:evaluateId')
  async delete(
    @Param('evaluateId', ParseIntPipe) leaveHistoryId: number,
  ): Promise<any> {
    return this.evaluateService.delete(leaveHistoryId);
  }
}
