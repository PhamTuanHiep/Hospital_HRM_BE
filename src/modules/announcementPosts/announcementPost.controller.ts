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
import { FilterDto } from 'src/dto/common.filter.dto';
import { AnnouncementPostService } from './announcementPost.service';
import { AnnouncementPostDto } from 'src/dto/announcementPost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilterInterceptor } from 'src/common/common.use.helper';
import { ImageService } from '../image/image.service';
import { ANNOUNCEMENT_POST_IMAGE_FOLDER } from 'src/common/common.constants';

@Controller('announcement-posts')
export class AnnouncementPostControllers {
  constructor(
    private announcementPostService: AnnouncementPostService,
    private imageService: ImageService,
  ) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.announcementPostService.findAll(query);
  }

  @Get('/:announcementPostId')
  findOne(
    @Param('announcementPostId', ParseIntPipe) announcementPostId: number,
  ): Promise<any> {
    return this.announcementPostService.findOne(announcementPostId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilterInterceptor,
    }),
  )
  async create(
    @Req() req: any,
    @Body(new ValidationPipe()) announcementPostDto: AnnouncementPostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (!file) {
      throw new BadRequestException('File is required');
    }
    const imageUrl = await this.imageService.uploadImage(
      file,
      ANNOUNCEMENT_POST_IMAGE_FOLDER,
    );

    return this.announcementPostService.create({
      ...announcementPostDto,
      image: imageUrl,
    });
  }

  @Put('/:announcementPostId')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilterInterceptor,
    }),
  )
  async update(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Param('announcementPostId', ParseIntPipe) announcementPostId: number,
    @Body() announcementPostDto: AnnouncementPostDto,
  ): Promise<any> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (file) {
      const imageUrl = await this.imageService.uploadImage(
        file,
        ANNOUNCEMENT_POST_IMAGE_FOLDER,
      );
      announcementPostDto.image = imageUrl;
    }

    return this.announcementPostService.update(
      announcementPostId,
      announcementPostDto,
    );
  }

  @Delete('/:announcementPostId')
  async delete(
    @Param('announcementPostId', ParseIntPipe) announcementPostId: number,
  ): Promise<any> {
    return this.announcementPostService.delete(announcementPostId);
  }
}
