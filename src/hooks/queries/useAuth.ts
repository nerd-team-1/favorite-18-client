import {getAccessToken, loginGoogle, logout, postSignup} from '@/api/auth/auth';
import queryClient from '@/api/queryClient';
import {getProfile, updateNickname} from '@/api/user/user';
import {headerKeys, numbers, queryKeys, storageKeys} from '@/constants';
import {
  ApiResponse,
  RefreshTokenInfo,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types/common';
import {UserProfile} from '@/types/domain';
import {ResponseJwt} from '@/types/response';
import {removeEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {removeHeader, setHeader} from '@/utils/header';
import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

// 회원가입 hook
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

// 로그인 용 메소드
function useLogin<T>(
  loginAPI: MutationFunction<ApiResponse<ResponseJwt>, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: ({data}) => {
      const refreshTokenInfo: RefreshTokenInfo = {
        refreshToken: data.refreshToken,
        refreshTokenExpiredAt: data.refreshTokenExpiredAt,
      };

      setEncryptStorage(storageKeys.REFRESH_TOKEN_INFO, refreshTokenInfo);
      setHeader(headerKeys.AUTH_TOKEN, `${data.accessToken}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

// 구글 로그인 hook
function useGoogleLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(loginGoogle, mutationOptions);
}

// 리프레쉬 토큰 발행 hook
function useGetRefreshToken() {
  const {isSuccess, data, isError, isPending} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESSH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESSH_TIME,
    refetchOnReconnect: true, // 앱 종료 없이 돌아와도 갱신
    refetchIntervalInBackground: true, // 백그라운드에서도 리패치
  });

  // 성공 시,
  useEffect(() => {
    if (isSuccess) {
      const refreshTokenInfo: RefreshTokenInfo = {
        refreshToken: data.data.refreshToken,
        refreshTokenExpiredAt: data.data.refreshTokenExpiredAt,
      };

      setHeader(headerKeys.AUTH_TOKEN, `${data.data.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN_INFO, refreshTokenInfo);
    }
  }, [isSuccess, data]);

  // 실패 시,
  useEffect(() => {
    if (isError) {
      removeHeader(headerKeys.AUTH_TOKEN);
      removeEncryptStorage(storageKeys.REFRESH_TOKEN_INFO);
    }
  }, [isError]);

  return {isSuccess, isError, isPending};
}

// 유저 정보 hook
function useGetProfile(
  queryOptions?: UseQueryCustomOptions<ApiResponse<UserProfile>>,
) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

// 로그아웃 hook
function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      removeHeader(headerKeys.AUTH_TOKEN);
      removeEncryptStorage(storageKeys.REFRESH_TOKEN_INFO);
      queryClient.resetQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useUpdateNickname(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateNickname,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const loginGoogleMutation = useGoogleLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const logoutMutation = useLogout();
  const profileMutation = useUpdateNickname();

  return {
    signupMutation,
    isLogin,
    loginGoogleMutation,
    getProfileQuery,
    logoutMutation,
    profileMutation,
  };
}

export default useAuth;
