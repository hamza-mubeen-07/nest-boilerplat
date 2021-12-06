import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserRepository } from '../../../prisma/repositories/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
