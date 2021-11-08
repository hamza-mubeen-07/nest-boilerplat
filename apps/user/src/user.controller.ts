import {
  Get,
  Controller,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDTO } from './user.dtos';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(Number(userId));
  }

  @Get()
  getUsers(
    @Query('search') search: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.userService.getUsers(search, Number(skip), Number(take));
  }

  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.createUser(createUserDTO);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: number,
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.updateUser(Number(userId), createUserDTO);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: number): Promise<User> {
    return this.userService.deleteUser(Number(userId));
  }
}
