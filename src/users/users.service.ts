import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersDB } from '../shared/databases/users';
import { TUser } from '../shared/types';
import { v4 as uuid } from 'uuid';
import { uuidValidate } from '../shared/utils/uuidValidate';
import { findRecord } from '../shared/utils/findRecord';

@Injectable()
export class UsersService {
  getUsers() {
    return usersDB.map(({ password, ...rest }) => ({ ...rest }));
  }

  createUser({ login, password }: CreateUserDto) {
    if (!(login && password)) {
      throw new Error('400');
    }
    const newUser: TUser = {
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    usersDB.push(newUser);
    return { ...newUser, password: undefined };
  }

  getUser(userId: string) {
    uuidValidate(userId);
    const user = findRecord(usersDB, userId);
    return { ...user, password: undefined };
  }

  updateUser(userId: string, { oldPassword, newPassword }: UpdateUserDto) {
    uuidValidate(userId);
    if (!(oldPassword && newPassword)) {
      throw new Error('400');
    }
    const user = findRecord(usersDB, userId) as TUser;
    if (user.password !== oldPassword) {
      throw new Error('403');
    }

    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    const { id, login, version, createdAt, updatedAt } = user;
    return { id, login, version, createdAt, updatedAt };
  }

  deleteUser(userId: string) {
    uuidValidate(userId);
    const user = findRecord(usersDB, userId) as TUser;
    const userIndex = usersDB.indexOf(user);
    usersDB.splice(userIndex, 1);
  }
}
