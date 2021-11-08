import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  getUser(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUsers(search: string, skip = 0, take = 13): Promise<User[]> {
    return this.prisma.user.findMany({
      skip: skip || 0,
      take: take || 13,
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  updateUser(userId: number, user: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: user,
    });
  }

  async deleteUser(userId: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
