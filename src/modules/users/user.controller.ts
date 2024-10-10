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
import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
import { FilterDto } from 'src/dto/common.filter.dto';

@Controller('users')
export class UserControllers {
  constructor(private userService: UserService) {}
  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.userService.findAll(query);
  }

  @Get('/:userId')
  findOne(@Param('userId', ParseIntPipe) userId: number): Promise<any> {
    return this.userService.findOne(userId);
  }

  @Post()
  async create(@Body(new ValidationPipe()) userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Put('/:userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userDto: UserDto,
  ): Promise<any> {
    return this.userService.update(userId, userDto);
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: number): Promise<any> {
    return this.userService.delete(userId);
  }
}
