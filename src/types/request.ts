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

export type {
  RequestAuthSignupGoogle,
  RequestAuthLoginGoogle,
  RequestUserUpdateNickname,
};
