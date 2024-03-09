import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "User's login",
  })
  login: string;
  @ApiProperty({
    description: "User's password",
  })
  password: string;
}
