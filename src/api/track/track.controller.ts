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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponsesMessages } from '../../shared/types';
import { exceptionHandler } from '../../shared/utils/exceptionHandler';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('Track') },
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
      return this.trackService.getTracks();
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              artistId: {
                type: 'string',
                format: 'uuid',
              },
              trackId: {
                type: 'string',
                format: 'uuid',
              },
              duration: {
                type: 'integer',
                description: 'In seconds',
              },
            },
            required: ['name', 'duration'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Track'),
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
  postAlbum(@Body() createTrackDto: CreateTrackDto) {
    try {
      return this.trackService.postTrack(createTrackDto);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Get(':trackId')
  @ApiParam({ name: 'trackId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Get track by id',
    description: 'Gets track by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Track'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @HttpCode(200)
  getAlbum(@Param('trackId') trackId: string) {
    try {
      return this.trackService.getTrack(trackId);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Put(':trackId')
  @ApiParam({ name: 'trackId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update track information by id',
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
                example: 'Show must go on',
              },
              artistId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
              },
              duration: {
                type: 'integer',
                description: 'Seconds',
                example: 65,
              },
              albumId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
              },
            },
            required: ['name', 'duration'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The track has been updated.',
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
            name: {
              type: 'string',
              example: 'Show must go on',
            },
            artistId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
            },
            duration: {
              type: 'integer',
              description: 'Seconds',
              example: 65,
            },
            albumId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @HttpCode(200)
  putAlbum(
    @Param('trackId') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return this.trackService.putTrack(trackId, updateTrackDto);
    } catch (error) {
      exceptionHandler(error);
    }
  }

  @Delete(':trackId')
  @ApiParam({ name: 'trackId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.Unauthorized,
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @HttpCode(204)
  deleteAlbum(@Param('trackId') trackId: string) {
    try {
      return this.trackService.deleteTrack(trackId);
    } catch (error) {
      exceptionHandler(error);
    }
  }
}
