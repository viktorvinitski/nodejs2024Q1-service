import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Track name',
  })
  name: string;

  @ApiProperty({
    description: "Artist's id",
  })
  artistId: string;

  @ApiProperty({
    description: "Album's id",
  })
  albumId: string;

  @ApiProperty({
    description: 'Duration of the track',
  })
  duration: number;
}
