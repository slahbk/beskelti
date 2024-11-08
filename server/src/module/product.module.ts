import { PrismaService } from 'src/prisma.service';
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../service/product.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
