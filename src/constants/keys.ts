const headerKeys = {
  AUTH_TOKEN: 'authorization-token',
};

const queryKeys = {
  AUTH: 'auth',
  GET_GOOGLE_LOGIN_URL: 'getGoogleLoginUrl',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  SONG: 'song',
  GET_SONG: 'getSong',
  GET_SONGS: 'getSongs',
  GET_MODEL_SCORE: 'getModelScore',
  GET_RANKING: 'getRanking',
};

const storageKeys = {
  REFRESH_TOKEN_INFO: 'refreshToken',
} as const;

export {headerKeys, queryKeys, storageKeys};
