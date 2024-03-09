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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponsesMessages } from '../../shared/types';
import { exceptionHandler } from '../../shared/utils/exceptionHandler';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all albums',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('Album') },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @HttpCode(200)
  getAlbums() {
    try {
      return this.albumService.getAlbums();
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              name: {
                type: 'string',
              },
              year: {
                type: 'integer',
              },
              artistId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
              },
            },
            required: ['name', 'year'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Album is created',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Album'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields.',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @HttpCode(201)
  postAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return this.albumService.createAlbum(createAlbumDto);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Get(':albumId')
  @ApiParam({ name: 'albumId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Get album by id',
    description: 'Gets album by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Album'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @HttpCode(200)
  getAlbum(@Param('albumId') albumId: string) {
    try {
      return this.albumService.getAlbum(albumId);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Put(':albumId')
  @ApiParam({ name: 'albumId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              name: {
                type: 'string',
              },
              year: {
                type: 'integer',
              },
              artistId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
              },
            },
            required: ['name', 'year'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The album has been updated.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath('Album') },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @HttpCode(200)
  putAlbum(
    @Param('albumId') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return this.albumService.updateAlbum(albumId, updateAlbumDto);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Delete(':albumId')
  @ApiParam({ name: 'albumId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @HttpCode(204)
  deleteAlbum(@Param('albumId') albumId: string) {
    try {
      return this.albumService.deleteAlbum(albumId);
    } catch (error) {
      exceptionHandler(error);
    }
  }
}
