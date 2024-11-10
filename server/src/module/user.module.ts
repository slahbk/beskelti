import { PrismaService } from 'src/prisma.service';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
