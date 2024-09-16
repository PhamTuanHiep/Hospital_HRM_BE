import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { User } from 'src/models/user.model';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserControllers {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<ResponseData<User[]>> {
    try {
      return new ResponseData<User[]>(
        await this.userService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<User[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:userId')
  async findOne(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseData<User>> {
    try {
      return new ResponseData<User>(
        await this.userService.findOne(userId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) userDto: UserDto,
  ): Promise<ResponseData<UserDto>> {
    try {
      let data = await this.userService.createUser(userDto);
      console.log('data:', data);
      return new ResponseData<User>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Put('/:userId')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() userDto: UserDto,
  ): Promise<ResponseData<User>> {
    try {
      let data = await this.userService.update(userId, userDto);
      return new ResponseData<User>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete('/:userId')
  async delete(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.userService.delete(userId)) ? true : false,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<boolean>(
        false,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
