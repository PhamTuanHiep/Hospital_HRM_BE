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
import { PositionService } from './position.service';
import { PositionDto } from 'src/dto/position.dto';
import { FilterDto } from 'src/dto/common.filter.dto';

@Controller('positions')
export class PositionControllers {
  constructor(private positionService: PositionService) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.positionService.findAll(query);
  }

  @Get('/:positionId')
  async findOne(@Param('positionId') positionId: string): Promise<any> {
    return this.positionService.findOne(positionId);
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) positionDto: PositionDto,
  ): Promise<any> {
    return this.positionService.create(positionDto);
  }

  @Put('/:positionId')
  async update(
    @Param('positionId') positionId: string,
    @Body() positionDto: PositionDto,
  ): Promise<any> {
    return this.positionService.update(positionId, positionDto);
  }

  @Delete('/:positionId')
  async delete(@Param('positionId') positionId: string): Promise<any> {
    return this.positionService.delete(positionId);
  }
}
