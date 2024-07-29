interface BaseType {
  id: number;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile extends BaseType {
  subid: string;
  email: string;
  name: string;
  nickname: string | null;
  birth: string | null;
  thumbnail: string | null;
  role: string;
  status: string;
}

interface MachineCode {
  machineType: string;
  songCode: string;
  createdAt: string;
  updatedAt: string;
}

interface Song extends MachineCode {
  songId: number;
  title: string;
  artist: string;
  albumUrl: string;
  lyrics: string;
  scoreCompareUrl: string;
  machineCodes: MachineCode[];
  totalFavoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export type {UserProfile, Song, MachineCode};
