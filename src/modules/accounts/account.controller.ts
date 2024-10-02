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
import { AccountService } from './account.service';
import { Account } from 'src/models/account.model';
import { AccountDto } from 'src/dto/account.dto';

@Controller('accounts')
export class AccountControllers {
  constructor(private accountService: AccountService) {}

  @Get()
  async findAll(): Promise<ResponseData<Account[]>> {
    try {
      return new ResponseData<Account[]>(
        await this.accountService.findAll(),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Account[]>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Get('/:accountId')
  async findOne(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<ResponseData<Account>> {
    try {
      return new ResponseData<Account>(
        await this.accountService.findOne(accountId),
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Post()
  async createUser(
    @Body(new ValidationPipe()) accountDto: AccountDto,
  ): Promise<ResponseData<AccountDto>> {
    try {
      let data = await this.accountService.create(accountDto);
      console.log('data:', data);
      return new ResponseData<Account>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Put('/:accountId')
  async update(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() accountDto: AccountDto,
  ): Promise<ResponseData<Account>> {
    try {
      let data = await this.accountService.update(accountId, accountDto);
      return new ResponseData<Account>(
        data,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (e) {
      return new ResponseData<Account>(
        null,
        HttpStatus.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  @Delete('/:accountId')
  async delete(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<ResponseData<boolean>> {
    try {
      return new ResponseData<boolean>(
        (await this.accountService.delete(accountId)) ? true : false,
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
