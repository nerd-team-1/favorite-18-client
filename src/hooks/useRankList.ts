import { Ranking } from '@/types/domain';
import { useState } from 'react';
import { ApiResponse, PageData } from '@/types/common';
import { useRank } from './queries/useRank';

function useRanking() {
    const [error, setError] = useState<string | null>(null);
    const { findRankingByRankDateAndMachineTypeMutation } = useRank();

    const fetchRanking = async (
        machineType: string,
        onSuccessHandler: (response: ApiResponse<PageData<Ranking>>) => void,
    ) => {
        try {
            findRankingByRankDateAndMachineTypeMutation.mutate(
                machineType, {
                onSuccess: onSuccessHandler,
                onError: (err: any) => {
                    setError(err.message);
                },
            });
        } catch (err: any) {
            setError(err.message);
        }
    };

    return { error, fetchRanking };
}

export { useRanking };
