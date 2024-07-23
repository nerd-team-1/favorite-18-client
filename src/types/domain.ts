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
  scoreCompareUrl: string;
  machineCodes: MachineCode[];
  totalFavoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

export type {Song, MachineCode};
