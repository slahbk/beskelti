
import { UseInterceptors, UploadedFile, Post, Controller, BadRequestException } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file).then((data) => {
      return {
        url: data.secure_url,
      };
    })
    .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }
}