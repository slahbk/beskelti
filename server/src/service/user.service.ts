import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      select: {
        company: true,
        email: true,
        id: true,
        fullName: true,
        products: true,
        avatar: true,
        phone: true,
      },
      where: { id: id },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({ include: { products: true } });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    return this.prisma.user.create({
      data,
    });
  }

  async deleteUser(id: Prisma.UserDeleteArgs['where']['id']): Promise<User> {
    return this.prisma.user.delete({
      where: { id: Number(id) },
    });
  }
}