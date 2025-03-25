import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from 'src/dto/account.dto';
import { FilterAccountsDto, FilterDto } from 'src/dto/common.filter.dto';
import { AccountEntity } from 'src/entities/account.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../image/image.service';
import { fileFilterInterceptor } from 'src/common/common.use.helper';
import { AVATAR_FOLDER } from 'src/common/common.constants';

@Controller('accounts')
export class AccountControllers {
  constructor(
    private accountService: AccountService,
    private imageService: ImageService,
  ) {}

  @Get()
  findAll(@Query() query: FilterAccountsDto): Promise<any> {
    return this.accountService.findAll(query);
  }

  @Get('/:accountId')
  findOne(@Param('accountId') accountId: string): Promise<AccountEntity> {
    return this.accountService.findOne(Number(accountId));
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: fileFilterInterceptor,
    }),
  )
  async create(
    @Req() req: any,
    @Body(new ValidationPipe()) accountDto: AccountDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (!file) {
      throw new BadRequestException('File is required');
    }
    const imageUrl = await this.imageService.uploadImage(file, AVATAR_FOLDER);
    const userId = accountDto.userId;
    const roleId = accountDto.roleId ?? 'user';

    return this.accountService.create(userId, roleId, {
      ...accountDto,
      avatar: imageUrl,
    });
  }

  @Put('/:accountId')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: fileFilterInterceptor,
    }),
  )
  async update(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() accountDto: AccountDto,
  ): Promise<any> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (file) {
      const imageUrl = await this.imageService.uploadImage(file, AVATAR_FOLDER);
      accountDto.avatar = imageUrl;
    }
    return this.accountService.update(accountId, accountDto);
  }

  @Delete('/:accountId')
  async delete(
    @Param('accountId', ParseIntPipe) accountId: number,
  ): Promise<any> {
    return this.accountService.delete(accountId);
  }
}
