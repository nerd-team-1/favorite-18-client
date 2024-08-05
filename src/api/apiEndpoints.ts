const apiEndpoints = {
  fetchAuthSignupGoogle: '/open-api/auth/signup',
  fetchAuthLoginGoogle: '/open-api/auth/login/google',
  fetchAuthRefreshToken: '/api/auth/refresh-token',
  fetchAuthLogout: '/api/auth/logout',
  fetchUserProfile: '/api/v1/user/me',
  fetchUserUpdateNickname: '/api/v1/user/nickname',
  fetchSong: '/api/v1/songs',
  defaultFavorite: '/api/v1/like',
  fetchConfirmLikeSong: '/api/v1/like/confirm',
  addSongRankCount: '/api/v1/rank/redis',
  fetchRanking: '/api/v1/rank'
};

export default apiEndpoints;
