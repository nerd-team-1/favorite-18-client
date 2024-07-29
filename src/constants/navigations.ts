const mainNavigations = {
  HOME: 'Home',
  RANKING: 'Ranking',
  SURROUND: 'Surrond',
  MODEL: 'Model',
  QNA: 'Qna',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const songNavigations = {
  SONG_HOME: 'SongHome',
  SONG_SEARCH_LIST: 'SongSerachList',
  SONG_DETAIL: 'SongDetail',
} as const;

const songTabNavigations = {
  SONG_HOME: 'SongTabHome',
} as const;

const rankingNavigations = {
  RANKING_HOME: 'RankingHome',
} as const;

const rankingTabNavigations = {
  RANKING_HOME: 'RankingTabHome',
} as const;

const surroundNavigations = {
  SURROND_HOME: 'SurroundHome',
} as const;

const surrondTabNavigations = {
  SURROND_HOME: 'SurroundTabHome',
} as const;

export {
  mainNavigations,
  authNavigations,
  songNavigations,
  songTabNavigations,
  rankingNavigations,
  rankingTabNavigations,
  surroundNavigations,
  surrondTabNavigations,
};
