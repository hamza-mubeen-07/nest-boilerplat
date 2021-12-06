import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../../../prisma/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUser(userId: number): Promise<User> {
    return this.userRepository.getUser(userId);
  }

  getUsers(search: string, skip: number, take: number): Promise<User[]> {
    return this.userRepository.getUsers(search, skip, take);
  }

  createUser(user: Prisma.UserCreateInput) {
    return this.userRepository.createUser(user);
  }

  updateUser(userId: number, user: Prisma.UserUpdateInput) {
    return this.userRepository.updateUser(userId, user);
  }

  deleteUser(userId: number) {
    return this.userRepository.deleteUser(userId);
  }
}
