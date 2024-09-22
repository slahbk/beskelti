import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async getProduct(
        productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    ): Promise<Product | null> {
        return this.prisma.product.findUnique({
            where: productWhereUniqueInput,
        }); 
    }

    async getAllProducts(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data
        });
    }

    async updateProduct(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
        return this.prisma.product.update({
            where: { id: Number(id) },
            data,
        });
    }

    async deleteProduct(id: number): Promise<Product> {
        return this.prisma.product.delete({
            where: { id: Number(id) },
        });
    }
}
