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
import { RecruitmentPostService } from './recruitmentPost.service';
import { RecruitmentPostDto } from 'src/dto/recruitmentPost.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilterInterceptor } from 'src/common/common.use.helper';
import { ImageService } from '../image/image.service';
import { RECRUITMENT_POST_IMAGE_FOLDER } from 'src/common/common.constants';

@Controller('recruitment-posts')
export class RecruitmentPostControllers {
  constructor(
    private recruitmentPostService: RecruitmentPostService,
    private imageService: ImageService,
  ) {}

  @Get()
  findAll(@Query() query: FilterDto): Promise<any> {
    return this.recruitmentPostService.findAll(query);
  }

  @Get('/:recruitmentPostId')
  findOne(
    @Param('recruitmentPostId', ParseIntPipe) recruitmentPostId: number,
  ): Promise<any> {
    return this.recruitmentPostService.findOne(recruitmentPostId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilterInterceptor,
    }),
  )
  async create(
    @Req() req: any,
    @Body(new ValidationPipe()) recruitmentPostDto: RecruitmentPostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (!file) {
      throw new BadRequestException('File image is required');
    }
    console.log('file:', file);

    const imageUrl = await this.imageService.uploadImage(
      file,
      RECRUITMENT_POST_IMAGE_FOLDER,
    );
    return this.recruitmentPostService.create({
      ...recruitmentPostDto,
      image: imageUrl,
    });
  }

  @Put('/:recruitmentPostId')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: fileFilterInterceptor,
    }),
  )
  async update(
    @Req() req: any,
    @Param('recruitmentPostId', ParseIntPipe) recruitmentPostId: number,
    @Body() recruitmentPostDto: RecruitmentPostDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (file) {
      console.log('file:', file);
      const imageUrl = await this.imageService.uploadImage(
        file,
        RECRUITMENT_POST_IMAGE_FOLDER,
      );

      return this.recruitmentPostService.update(
        recruitmentPostId,
        recruitmentPostDto,
        imageUrl,
      );
    }
    console.log('no-file:');
    return this.recruitmentPostService.update(
      recruitmentPostId,
      recruitmentPostDto,
    );
  }

  @Delete('/:recruitmentPostId')
  async delete(
    @Param('recruitmentPostId', ParseIntPipe) recruitmentPostId: number,
  ): Promise<any> {
    return this.recruitmentPostService.delete(recruitmentPostId);
  }
}
