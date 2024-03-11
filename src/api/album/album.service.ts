import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albumsDB } from '../../shared/databases/albums';
import { TAlbum } from '../../shared/types';
import { v4 as uuid } from 'uuid';
import { uuidValidate } from '../../shared/utils/uuidValidate';
import { findRecord } from '../../shared/utils/findRecord';
import { tracksDB } from '../../shared/databases/tracks';
import { favoritesDB } from '../../shared/databases/favorites';

@Injectable()
export class AlbumService {
  getAlbums() {
    return albumsDB;
  }

  createAlbum({ name, year, artistId }: CreateAlbumDto) {
    if (!(name && year !== undefined)) {
      throw new Error('400');
    }
    const newAlbum: TAlbum = {
      id: uuid(),
      name,
      year,
      artistId: artistId ?? null,
    };
    albumsDB.push(newAlbum);
    return newAlbum;
  }

  getAlbum(albumId: string) {
    uuidValidate(albumId);
    return findRecord(albumsDB, albumId);
  }

  updateAlbum(albumId: string, { name, year, artistId }: UpdateAlbumDto) {
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
    const album = findRecord(albumsDB, albumId) as TAlbum;
    album.name = name;
    album.year = year;
    album.artistId = artistId ?? null;
    return album;
  }

  deleteAlbum(albumId: string) {
    uuidValidate(albumId);
    const album = findRecord(albumsDB, albumId) as TAlbum;
    const albumIndex = albumsDB.indexOf(album);
    albumsDB.splice(albumIndex, 1);
    const track = tracksDB.find((track) => track.albumId === albumId);
    if (track) {
      track.albumId = null;
    }
    const albumFavsIndex = favoritesDB.albums.indexOf(album);
    favoritesDB.albums.splice(albumFavsIndex, 1);
  }
}
