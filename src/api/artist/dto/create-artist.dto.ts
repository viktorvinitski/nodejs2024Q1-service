import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    description: "Artist's name",
  })
  name: string;

  @ApiProperty({
    description: 'Is artist has grammy',
  })
  grammy: boolean;
}
