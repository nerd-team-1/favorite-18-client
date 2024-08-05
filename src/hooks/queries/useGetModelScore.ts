import {getModelScore} from '@/api/model/model';
import {UseMutationCustomOptions} from '@/types/common';
import {useMutation} from '@tanstack/react-query';

function useGetModelScore(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getModelScore,
    ...mutationOptions,
  });
}

export default useGetModelScore;
