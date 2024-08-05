import { getRanking } from '@/api/rank';
import { ApiResponse, PageData, UseMutationCustomOptions } from '@/types/common';
import { Ranking } from '@/types/domain';
import { MutationFunction, useMutation } from '@tanstack/react-query';

function useFindRankings<T>(
    rankingApi: MutationFunction<ApiResponse<PageData<Ranking>>, T>,
    mutationOptions?: UseMutationCustomOptions,
) {
    return useMutation({
        mutationFn: rankingApi,
        ...mutationOptions,
    });
}

function useFindRankingByRankDateAndMachineType(mutationOptions?: UseMutationCustomOptions) {
    return useFindRankings(getRanking, mutationOptions);
}

function useRank() {
    const findRankingByRankDateAndMachineTypeMutation = useFindRankingByRankDateAndMachineType();

    return { findRankingByRankDateAndMachineTypeMutation };
}

export { useRank };
