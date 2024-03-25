import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { TArtist } from '../../shared/types';
import { v4 as uuid } from 'uuid';
import { uuidValidate } from '../../shared/utils/uuidValidate';
import { findRecord } from '../../shared/utils/findRecord';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getArtists() {
    return await this.prisma.artists.findMany();
  }

  async createArtist({ name, grammy }: CreateArtistDto) {
    if (!(name && grammy !== undefined)) {
      throw new Error('400');
    }
    const newArtist: TArtist = {
      id: uuid(),
      name,
      grammy,
    };
    return await this.prisma.artists.create({
      data: newArtist,
    });
  }

  async getArtist(artistId: string) {
    uuidValidate(artistId);
    return await findRecord(this.prisma, artistId, 'artists');
  }

  async updateArtist(artistId: string, { name, grammy }: UpdateArtistDto) {
    uuidValidate(artistId);
    if (
      !(
        name &&
        grammy !== undefined &&
        typeof name === 'string' &&
        typeof grammy === 'boolean'
      )
    ) {
      throw new Error('400');
    }
    await findRecord(this.prisma, artistId, 'artists');
    return await this.prisma.artists.update({
      where: {
        id: artistId,
      },
      data: {
        name,
        grammy,
      },
    });
  }

  async deleteArtist(artistId: string) {
    uuidValidate(artistId);
    await findRecord(this.prisma, artistId, 'artists');
    await this.prisma.artists.delete({
      where: {
        id: artistId,
      },
    });
    this.prisma.favoriteArtists.delete({
      where: {
        artistId,
      },
    });
  }
}
