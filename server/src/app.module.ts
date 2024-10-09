import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { PrismaService } from './prisma.service';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryController } from './cloudinary/cloudinary.controller';

@Module({
  imports: [CloudinaryModule],
  controllers: [UserController, ProductController, CloudinaryController],
  providers: [UserService, ProductService, PrismaService, CloudinaryService],
})
export class AppModule {}
