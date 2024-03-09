import { Injectable } from '@nestjs/common';
import { artistsDB } from '../shared/databases/artists';
import { CreateArtistDto } from './dto/create-artist.dto';
import { TArtist } from '../shared/types';
import { v4 as uuid } from 'uuid';
import { uuidValidate } from '../shared/utils/uuidValidate';
import { findRecord } from '../shared/utils/findRecord';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { favoritesDB } from '../shared/databases/favorites';
import { tracksDB } from '../shared/databases/tracks';
import { albumsDb } from '../shared/databases/albums';

@Injectable()
export class ArtistService {
  getArtists() {
    return artistsDB;
  }

  createArtist({ name, grammy }: CreateArtistDto) {
    if (!(name && grammy !== undefined)) {
      throw new Error('400');
    }
    const newArtist: TArtist = {
      id: uuid(),
      name,
      grammy,
    };
    artistsDB.push(newArtist);
    return newArtist;
  }

  getArtist(artistId: string) {
    uuidValidate(artistId);
    return findRecord(artistsDB, artistId);
  }

  updateArtist(artistId: string, { name, grammy }: UpdateArtistDto) {
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
    const artist = findRecord(artistsDB, artistId) as TArtist;
    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  deleteArtist(artistId: string) {
    uuidValidate(artistId);
    const artist = findRecord(artistsDB, artistId);
    const artistIndex = artistsDB.indexOf(artist as TArtist);
    artistsDB.splice(artistIndex, 1);
    const album = albumsDb.find((album) => album.artistId === artistId);
    if (album) {
      album.artistId = null;
    }
    const track = tracksDB.find((track) => track.artistId === artistId);
    if (track) {
      track.artistId = null;
    }
    const artistFavsIndex = favoritesDB.artists.indexOf(artist as TArtist);
    favoritesDB.artists.splice(artistFavsIndex, 1);
  }
}
