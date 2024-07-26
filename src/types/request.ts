type UserInfo = {
  id: string;
  email: string;
  name: string | null;
  familyName: string | null;
  givenName: string | null;
  photo: string | null;
};

type RequestAuthLoginGoogle = {
  authCode: string;
  userInfo: UserInfo;
};

type RequestUserUpdateNickname = {
  nickname: string;
};

export type {UserInfo, RequestAuthLoginGoogle, RequestUserUpdateNickname};
