import { Injectable } from '@nestjs/common';
import { uuidValidate } from '../../shared/utils/uuidValidate';
import { findRecord } from '../../shared/utils/findRecord';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites() {
    return {
      artists: (
        await this.prisma.favoriteArtists.findMany({
          select: {
            artist: true,
          },
        })
      ).map((artist) => artist.artist),
      albums: (
        await this.prisma.favoriteAlbums.findMany({
          select: {
            album: true,
          },
        })
      ).map((album) => album.album),
      tracks: (
        await this.prisma.favoriteTracks.findMany({
          select: {
            track: true,
          },
        })
      ).map((track) => track.track),
    };
  }

  async postFavoritesTrack(trackId: string) {
    await this.postFavorites(trackId, this.prisma, 'tracks', 'favoriteTracks');
  }

  async deleteFavoritesTrack(trackId: string) {
    await this.deleteFavorites(
      trackId,
      this.prisma,
      'tracks',
      'favoriteTracks',
    );
  }

  async postFavoritesAlbum(albumId: string) {
    await this.postFavorites(albumId, this.prisma, 'albums', 'favoriteAlbums');
  }

  async deleteFavoritesAlbum(albumId: string) {
    await this.deleteFavorites(
      albumId,
      this.prisma,
      'albums',
      'favoriteAlbums',
    );
  }

  async postFavoritesArtist(artistId: string) {
    await this.postFavorites(
      artistId,
      this.prisma,
      'artists',
      'favoriteArtists',
    );
  }

  async deleteFavoritesArtist(artistId: string) {
    await this.deleteFavorites(
      artistId,
      this.prisma,
      'artists',
      'favoriteArtists',
    );
  }

  async postFavorites(
    id: string,
    prisma: PrismaService,
    model: string,
    type: string,
  ) {
    uuidValidate(id);
    const record = await findRecord(prisma, id, model, '422');
    const nameId = [
      ['tracks', 'trackId'],
      ['artists', 'artistId'],
      ['albums', 'albumId'],
    ].find((el) => el[0] === model)[1];
    await prisma[type].create({
      data: {
        [nameId]: record.id,
      },
    });
  }

  async deleteFavorites(
    id: string,
    prisma: PrismaService,
    model: string,
    type: string,
  ) {
    uuidValidate(id);
    await findRecord(prisma, id, model);
    const nameId = [
      ['tracks', 'trackId'],
      ['artists', 'artistId'],
      ['albums', 'albumId'],
    ].find((el) => el[0] === model)[1];
    await prisma[type].delete({
      where: {
        [nameId]: id,
      },
    });
  }
}
