interface SongDto {
  id: number;
  title: string;
  artist: string;
  albumPictureUrl: string;
}

interface SongCodeDto {
  machineType: string;
  songCode: string;
  createdAt: string;
  updatedAt: string;
}

interface SongRankDto {
  songId: number;
  title: string;
  artist: string;
  albumUrl: string;
  machineCodes: SongCodeDto[];
  totalFavoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export type {SongDto, SongRankDto};
