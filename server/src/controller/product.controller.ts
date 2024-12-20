import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  
  import { ProductService } from '../service/product.service';
  import { Product, Product as ProductModel } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
  interface ProductCreateInput extends ProductModel {
    user: {
      connect: {
        id: number;
      };
    };
  }
  @Controller('api/product')
  export class ProductController {
    constructor(private productService: ProductService) {}
  
    @Get()
    async getAllProducts() {
      return await this.productService.getAllProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id: number) {
      return await this.productService.getProduct({ id: Number(id) });
    }

    @UseGuards(AuthGuard)
    @Post('add')
    async createProduct(@Body() product: ProductCreateInput) {
      return await this.productService.createProduct(product);
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async updateProduct(@Param('id') id: number, @Body() product: Product) {
      return await this.productService.updateProduct(id, product);
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async deleteProduct(@Param('id') id: number) {
      return await this.productService.deleteProduct(id);
    }
}
