import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { GetUserArgs } from './dto/args/get-user-args.dto';
import { CreateUserInput } from './dto/input/create-user-input.dto';
import { UpdateUserInput } from './dto/input/update-user-input.dto';
import { User } from './User';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return this.usersRepository.findOne(getUserArgs);
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(createUserData: CreateUserInput): Promise<User> {
    return this.usersRepository.create({
      userId: uuidv4(),
      email: createUserData.email,
      age: createUserData.age,
      favoriteFoods: [],
    });
  }

  async updateUser(updateUserData: UpdateUserInput): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId: updateUserData.userId }, updateUserData);
  }
}
