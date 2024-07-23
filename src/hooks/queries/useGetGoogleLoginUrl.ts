import {getGoogleLoginUrl} from '@/api/auth/auth';
import {queryKeys} from '@/constants';
import {ApiResponse, UseQueryCustomOptions} from '@/types/common';
import {useQuery} from '@tanstack/react-query';

function useGetGoogleLoginUrl(
  queryOptions?: UseQueryCustomOptions<ApiResponse<string>>,
) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_GOOGLE_LOGIN_URL],
    queryFn: getGoogleLoginUrl,
    ...queryOptions,
  });
}

export default useGetGoogleLoginUrl;
