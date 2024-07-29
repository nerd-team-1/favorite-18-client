const apiEndpoints = {
  fetchAuthGoogleLoginUrl: '/open-api/auth/login',
  fetchAuthLoginGoogle: '/open-api/auth/login/google',
  fetchAuthRefreshToken: '/api/auth/refresh-token',
  fetchAuthLogout: '/api/auth/logout',
  fetchUserProfile: '/api/v1/user/me',
  fetchSong: '/api/v1/songs',
  defaultFavorite: '/api/v1/like',
  fetchConfirmLikeSong: '/api/v1/like/confirm',
};

export default apiEndpoints;
