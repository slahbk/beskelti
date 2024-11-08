import { PrismaService } from 'src/prisma.service';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
