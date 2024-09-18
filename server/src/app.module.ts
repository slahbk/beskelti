import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';

import { UserService } from './service/user.service';
import { PrismaService } from './prisma.service';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';

@Module({
  imports: [],
  controllers: [UserController, ProductController],
  providers: [UserService, ProductService, PrismaService],
})
export class AppModule {}
