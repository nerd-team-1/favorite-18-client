import {getModelScoreHistory} from '@/api/model/model';
import {queryKeys} from '@/constants';
import {ApiResponse, UseQueryCustomOptions} from '@/types/common';
import {ModelScore} from '@/types/domain';
import {useQuery} from '@tanstack/react-query';

function useGetModelScoreList(
  queryOptions?: UseQueryCustomOptions<ApiResponse<ModelScore[]>>,
) {
  return useQuery({
    queryFn: getModelScoreHistory,
    queryKey: [queryKeys.GET_MODEL_SCORE],
    ...queryOptions,
  });
}

export default useGetModelScoreList;
