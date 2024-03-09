import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: "User's password",
  })
  oldPassword: string;

  @ApiProperty({
    description: "User's password",
  })
  newPassword: string;
}
