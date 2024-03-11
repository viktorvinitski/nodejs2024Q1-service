import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

const errors = [
  { code: '400', handler: BadRequestException },
  { code: '403', handler: ForbiddenException },
  { code: '404', handler: NotFoundException },
  { code: '401', handler: UnauthorizedException },
  { code: '422', handler: UnprocessableEntityException },
];

export const exceptionHandler = (error: Error) => {
  throw new (errors.find((item) => item.code === error.message).handler)();
};
