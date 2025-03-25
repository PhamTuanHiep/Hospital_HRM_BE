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
import { AllowanceRelationshipService } from './allowance-relationship.service';
import { AllowanceRelationshipEntity } from 'src/entities/allowance-relationship.entity';
import { AllowanceRelationshipDto } from 'src/dto/allowance-relationship.dto';

@Controller('allowance_relationships')
export class AllowanceRelationshipControllers {
  constructor(
    private allowanceRelationshipService: AllowanceRelationshipService,
  ) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.allowanceRelationshipService.findAll(query);
  }

  @Get('/:id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AllowanceRelationshipEntity> {
    return this.allowanceRelationshipService.findOne(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe())
    allowanceRelationshipDto: AllowanceRelationshipDto,
  ) {
    return this.allowanceRelationshipService.create(allowanceRelationshipDto);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() allowanceRelationshipDto: AllowanceRelationshipDto,
  ): Promise<any> {
    return this.allowanceRelationshipService.update(
      id,
      allowanceRelationshipDto,
    );
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.allowanceRelationshipService.delete(id);
  }
}
