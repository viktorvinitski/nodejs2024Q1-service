import { Injectable } from '@nestjs/common';
import { favoritesDB } from '../../shared/databases/favorites';
import { tracksDB } from '../../shared/databases/tracks';
import { albumsDB } from '../../shared/databases/albums';
import { artistsDB } from '../../shared/databases/artists';
import { uuidValidate } from '../../shared/utils/uuidValidate';
import { findRecord } from '../../shared/utils/findRecord';
import { TDatabase } from '../../shared/types';

@Injectable()
export class FavoritesService {
  getFavorites() {
    return favoritesDB;
  }

  postFavoritesTrack(trackId: string) {
    this.postFavorites(trackId, tracksDB, 'tracks');
  }

  deleteFavoritesTrack(trackId: string) {
    this.deleteFavorites(trackId, 'tracks');
  }

  postFavoritesAlbum(albumId: string) {
    this.postFavorites(albumId, albumsDB, 'albums');
  }

  deleteFavoritesAlbum(albumId: string) {
    this.deleteFavorites(albumId, 'albums');
  }

  postFavoritesArtist(artistId: string) {
    this.postFavorites(artistId, artistsDB, 'artists');
  }

  deleteFavoritesArtist(artistId: string) {
    this.deleteFavorites(artistId, 'artists');
  }

  postFavorites(id: string, database: TDatabase[], type: string) {
    uuidValidate(id);
    const record = findRecord(database, id, '422');
    favoritesDB[type].push(record);
  }

  deleteFavorites(id: string, type: string) {
    uuidValidate(id);
    const record = findRecord(favoritesDB[type], id);
    const recordIndex = favoritesDB[type].indexOf(record);
    favoritesDB[type].splice(recordIndex, 1);
  }
}
