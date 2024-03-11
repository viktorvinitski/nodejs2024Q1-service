export type TUser = {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

export type TArtist = {
  id: string;
  name: string;
  grammy: boolean;
};

export type TTrack = {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
};

export type TAlbum = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

export type TFavorites = {
  artists: TArtist[];
  albums: TAlbum[];
  tracks: TTrack[];
};

export type TDatabase = TUser | TArtist | TTrack | TAlbum;

export enum ResponsesMessages {
  Unauthorized = 'Access token is missing or invalid',
}
