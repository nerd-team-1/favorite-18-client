type ResponseJwt = {
  accessToken: string;
  accessTokenExpiredAt: string;
  refreshToken: string;
  refreshTokenExpiredAt: string;
};

type ResponseModelUpload = {
  modelScoreId: number;
  recordedFilename: string;
};

type ResponseModelScore = {
  recordedFilename: string;
  score: number;
  tune: number;
  similarity: number;
};

export type {ResponseJwt, ResponseModelUpload, ResponseModelScore};
