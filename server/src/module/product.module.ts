import { PrismaService } from 'src/prisma.service';
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../service/product.service';
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, AuthService, UserService],
})
export class ProductModule {}
