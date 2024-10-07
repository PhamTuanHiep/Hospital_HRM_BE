import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  //FileInterceptor giúp parse file field từ request và lưu trữ nó vào đối tượng request dưới dạng @UploadedFile().
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log('file in Controller:', file);

    const imageUrl = await this.imageService.uploadImage(file);
    console.log('imageUrl:', imageUrl);
    //handle success, return URL or other response
    return { imageUrl };
  }
}
