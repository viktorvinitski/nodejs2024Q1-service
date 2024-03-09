import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { tracksDB } from '../../shared/databases/tracks';
import { TTrack } from '../../shared/types';
import { v4 as uuid } from 'uuid';
import { uuidValidate } from '../../shared/utils/uuidValidate';
import { findRecord } from '../../shared/utils/findRecord';
import { favoritesDB } from '../../shared/databases/favorites';

@Injectable()
export class TrackService {
  getTracks() {
    return tracksDB;
  }

  postTrack({ name, artistId, albumId, duration }: CreateTrackDto) {
    if (!(name && duration !== undefined)) {
      throw new Error('400');
    }
    const newTrack: TTrack = {
      id: uuid(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };
    tracksDB.push(newTrack);
    return newTrack;
  }

  getTrack(trackId: string) {
    uuidValidate(trackId);
    return findRecord(tracksDB, trackId);
  }

  putTrack(
    trackId: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ) {
    uuidValidate(trackId);
    if (
      !(
        name &&
        duration !== undefined &&
        typeof name === 'string' &&
        typeof duration === 'number'
      )
    ) {
      throw new Error('400');
    }
    const track = findRecord(tracksDB, trackId) as TTrack;
    track.name = name;
    track.artistId = artistId ?? null;
    track.albumId = albumId ?? null;
    track.duration = duration;
    return track;
  }

  deleteTrack(trackId: string) {
    uuidValidate(trackId);
    const track = findRecord(tracksDB, trackId) as TTrack;
    const trackIndex = tracksDB.indexOf(track);
    tracksDB.splice(trackIndex, 1);
    const trackFavsIndex = favoritesDB.tracks.indexOf(track);
    favoritesDB.tracks.splice(trackFavsIndex, 1);
  }
}
