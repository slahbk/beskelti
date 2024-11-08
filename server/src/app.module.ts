import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryController } from './cloudinary/cloudinary.controller';
import { ProductModule } from './module/product.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [CloudinaryModule, ProductModule, UserModule],
  controllers: [CloudinaryController],
  providers: [PrismaService, CloudinaryService],
})
export class AppModule {}
