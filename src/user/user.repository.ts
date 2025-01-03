import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UserRepository {
  public users: User[];
  constructor() {
    this.users = []
  }

  private convertToUser(createUser: CreateUserDto): User {
    const user = new User();

    user.username = createUser.username;
    user.password = createUser.password;
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.email = createUser.email;
    user.active = createUser.active;

    return user
  }

  public create(createUser: CreateUserDto): User {
    const user = this.convertToUser(createUser);
    user.id = randomUUID();
    this.users.push(user)
    return user;
  }

  public findAll() {
    return this.users;
  }

  public findOne(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user
  }

  public update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.password) {
      user.password = updateUserDto.password;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email
    }
    if (updateUserDto.active) {
      user.active = updateUserDto.active
    }
      return user;
  }

  public remove(id: string) {
    const index = this.users.findIndex((prop) => prop.id === id)
    if (index < 0) {
      throw new NotFoundException()
    }
    this.users.splice(index, 1)
  }
}
