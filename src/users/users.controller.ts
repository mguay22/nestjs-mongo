import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateUserRequest } from './dto/request/create-user-request.dto';
import { UpdateUserRequest } from './dto/request/update-user-request.dto';

import { User } from './User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUser({ userId });
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserRequest: CreateUserRequest): Promise<User> {
    return this.usersService.createUser(createUserRequest);
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    return this.usersService.updateUser({ userId, ...updateUserRequest });
  }
}
