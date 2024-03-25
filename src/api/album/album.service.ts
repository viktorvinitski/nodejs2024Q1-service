import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TAlbum } from '../../shared/types';
import { v4 as uuid } from 'uuid';
import { uuidValidate } from '../../shared/utils/uuidValidate';
import { findRecord } from '../../shared/utils/findRecord';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAlbums() {
    return await this.prisma.albums.findMany();
  }

  async createAlbum({ name, year, artistId }: CreateAlbumDto) {
    if (!(name && year !== undefined)) {
      throw new Error('400');
    }
    const newAlbum: TAlbum = {
      id: uuid(),
      name,
      year,
      artistId: artistId ?? null,
    };
    return await this.prisma.albums.create({
      data: newAlbum,
    });
  }

  async getAlbum(albumId: string) {
    uuidValidate(albumId);
    return await findRecord(this.prisma, albumId, 'albums');
  }

  async updateAlbum(albumId: string, { name, year, artistId }: UpdateAlbumDto) {
    uuidValidate(albumId);
    if (
      !(
        name &&
        year !== undefined &&
        typeof name === 'string' &&
        typeof year === 'number'
      )
    ) {
      throw new Error('400');
    }
    await findRecord(this.prisma, albumId, 'albums');
    return await this.prisma.albums.update({
      where: {
        id: albumId,
      },
      data: {
        name,
        year,
        artistId: artistId ?? null,
      },
    });
  }

  async deleteAlbum(albumId: string) {
    uuidValidate(albumId);
    await findRecord(this.prisma, albumId, 'albums');
    await this.prisma.albums.delete({
      where: {
        id: albumId,
      },
    });
    this.prisma.favoriteAlbums.delete({
      where: {
        albumId,
      },
    });
  }
}
