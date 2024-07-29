import {ApiResponse, RefreshTokenInfo} from '@/types/common';
import instance from '../axios';
import {RequestAuthLoginGoogle, RequestAuthSignupGoogle} from '@/types/request';
import {ResponseJwt} from '@/types/response';
import {getEncryptStorage} from '@/utils/encryptStorage';
import {storageKeys} from '@/constants';
import apiEndpoints from '../apiEndpoints';
import {UserProfile} from '@/types/domain';

// 회원가입 API
const postSignup = async ({
  birth,
  gender,
  userInfo,
}: RequestAuthSignupGoogle): Promise<UserProfile> => {
  const {data} = await instance.post(apiEndpoints.fetchAuthSignupGoogle, {
    birth,
    gender,
    userInfo,
  });

  return data;
};

// 구글 로그인 API
const loginGoogle = async ({
  authCode,
  userInfo,
}: RequestAuthLoginGoogle): Promise<ApiResponse<ResponseJwt>> => {
  const {data} = await instance.post(apiEndpoints.fetchAuthLoginGoogle, {
    authCode,
    userInfo,
  });

  return data;
};

// 액세스 토큰 발행 API
const getAccessToken = async (): Promise<ApiResponse<ResponseJwt>> => {
  const refreshToken: RefreshTokenInfo = await getEncryptStorage(
    storageKeys.REFRESH_TOKEN_INFO,
  );

  const {data} = await instance.post(
    apiEndpoints.fetchAuthRefreshToken,
    refreshToken,
  );

  return data;
};

// 로그아웃 API
const logout = async () => {
  // 현재 서버는 리프레시 토큰 관리하지 않음
  await instance.post(apiEndpoints.fetchAuthLogout);
};

export {postSignup, loginGoogle, getAccessToken, logout};
