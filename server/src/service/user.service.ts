import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: { products: true },
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