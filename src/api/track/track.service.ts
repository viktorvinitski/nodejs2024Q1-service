import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TTrack } from '../../shared/types';
import { v4 as uuid } from 'uuid';
import { uuidValidate } from '../../shared/utils/uuidValidate';
import { findRecord } from '../../shared/utils/findRecord';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getTracks() {
    return await this.prisma.tracks.findMany();
  }

  async postTrack({ name, artistId, albumId, duration }: CreateTrackDto) {
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
    return await this.prisma.tracks.create({
      data: newTrack,
    });
  }

  async getTrack(trackId: string) {
    uuidValidate(trackId);
    return await findRecord(this.prisma, trackId, 'tracks');
  }

  async putTrack(
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
    await findRecord(this.prisma, trackId, 'tracks');
    return await this.prisma.tracks.update({
      where: {
        id: trackId,
      },
      data: {
        name,
        artistId: artistId ?? null,
        albumId: albumId ?? null,
        duration,
      },
    });
  }

  async deleteTrack(trackId: string) {
    uuidValidate(trackId);
    await findRecord(this.prisma, trackId, 'tracks');
    await this.prisma.tracks.delete({
      where: {
        id: trackId,
      },
    });
    this.prisma.favoriteTracks.delete({
      where: {
        trackId,
      },
    });
  }
}
