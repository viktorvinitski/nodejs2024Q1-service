import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TUser } from '../../shared/types';
import { v4 as uuid } from 'uuid';
import { uuidValidate } from '../../shared/utils/uuidValidate';
import { findRecord } from '../../shared/utils/findRecord';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return (await this.prisma.users.findMany()).map((user) => ({
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
      password: undefined,
    }));
  }

  async createUser({ login, password }: CreateUserDto) {
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
    await this.prisma.users.create({
      data: newUser,
    });
    return { ...newUser, password: undefined };
  }

  async getUser(userId: string) {
    uuidValidate(userId);
    const user = await findRecord(this.prisma, userId, 'users');
    return {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
      password: undefined,
    };
  }

  async updateUser(
    userId: string,
    { oldPassword, newPassword }: UpdateUserDto,
  ) {
    uuidValidate(userId);
    if (!(oldPassword && newPassword)) {
      throw new Error('400');
    }
    const user = await findRecord(this.prisma, userId, 'users');
    if (user.password !== oldPassword) {
      throw new Error('403');
    }

    const updatedUser = await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      },
    });
    return {
      ...updatedUser,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
      password: undefined,
    };
  }

  async deleteUser(userId: string) {
    uuidValidate(userId);
    await findRecord(this.prisma, userId, 'users');
    await this.prisma.users.delete({
      where: {
        id: userId,
      },
    });
  }
}
