import {UserInfo} from './common';

type RequestAuthSignupGoogle = {
  birth: string;
  gender: string;
  userInfo: UserInfo;
};

type RequestAuthLoginGoogle = {
  authCode: string;
  userInfo: UserInfo;
};

type RequestUserUpdateNickname = {
  nickname: string;
};

type RequestModelUpload = {
  songId: string;
};

type RequestModelScore = {
  modelScoreId: number;
  originalFilename: string;
  recordedFilename: string;
};

export type {
  RequestAuthSignupGoogle,
  RequestAuthLoginGoogle,
  RequestUserUpdateNickname,
  RequestModelUpload,
  RequestModelScore,
};
