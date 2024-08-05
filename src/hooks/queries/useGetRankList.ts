import {getSongRankList} from '@/api/rank/rank';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types/common';
import {ResponseRankScore} from '@/types/response';
import {useQuery} from '@tanstack/react-query';

function useGetRankingList(
  queryOptions?: UseQueryCustomOptions<ResponseRankScore[]>,
) {
  return useQuery({
    queryFn: getSongRankList,
    queryKey: [queryKeys.GET_RANKING],
    ...queryOptions,
  });
}

export default useGetRankingList;
