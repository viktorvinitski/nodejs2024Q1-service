import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { exceptionHandler } from '../../shared/utils/exceptionHandler';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponsesMessages } from '../../shared/types';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('User') },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @HttpCode(200)
  getUsers() {
    try {
      return this.usersService.getUsers();
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Create new user',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              login: {
                type: 'string',
                description: "User's login",
              },
              password: {
                type: 'string',
                description: "User's password",
              },
            },
            required: ['login', 'password'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been created',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('User'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Body does not contain required fields.',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @HttpCode(201)
  postUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Get(':userId')
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Get user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('User'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @HttpCode(200)
  getUser(@Param('userId') userId: string) {
    try {
      return this.usersService.getUser(userId);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Put(':userId')
  @ApiOperation({
    summary: "Update user's password",
    description: "Updates user's password by id",
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              oldPassword: {
                type: 'string',
                description: "The user's old password",
              },
              newPassword: {
                type: 'string',
                description: "The user's new password",
              },
            },
            required: ['oldPassword', 'newPassword'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been updated.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'example',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            login: {
              type: 'string',
              example: 'TestUser',
            },
            version: {
              type: 'integer',
              example: 2,
            },
            createAt: {
              type: 'integer',
              example: 1655000000,
            },
            updateAt: {
              type: 'integer',
              example: 1655999999,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 403,
    description: 'oldPassword is wrong',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @HttpCode(200)
  putUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.updateUser(userId, updateUserDto);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Delete(':userId')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user by id.',
  })
  @ApiResponse({
    status: 204,
    description: 'The user has been deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @HttpCode(204)
  deleteUser(@Param('userId') userId: string) {
    try {
      this.usersService.deleteUser(userId);
    } catch (error) {
      exceptionHandler(error);
    }
  }
}
