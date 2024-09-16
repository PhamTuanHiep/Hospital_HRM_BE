import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { RoleService } from './role.service';
import { Role } from 'src/models/role.model';
import { RoleDto } from 'src/dto/role.dto';

@Controller('roles')
export class RoleControllers {
  constructor(private roleService: RoleService) {}

  @Get()
  async findAll(): Promise<ResponseData<Role[]>> {
    try {
      return new ResponseData<Role[]>(
        await this.roleService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Role[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:roleId')
  async findOne(@Param('roleId') roleId: string): Promise<ResponseData<Role>> {
    try {
      return new ResponseData<Role>(
        await this.roleService.findOne(roleId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Role>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  async createRole(
    @Body(new ValidationPipe()) roleDto: RoleDto,
  ): Promise<ResponseData<RoleDto>> {
    try {
      let data = await this.roleService.createRole(roleDto);
      console.log('data:', data);
      return new ResponseData<Role>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Role>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Put('/:roleId')
  async update(
    @Param('roleId') roleId: string,
    @Body() roleDto: RoleDto,
  ): Promise<ResponseData<Role>> {
    try {
      let data = await this.roleService.update(roleId, roleDto);
      return new ResponseData<Role>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Role>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete('/:roleId')
  async delete(
    @Param('roleId') roleId: string,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.roleService.delete(roleId)) ? true : false,
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
