import {useState} from 'react';
import {useFavorite} from './queries/useFavorite';
import {ApiResponse} from '@/types/common';

function useFavoriteInfo() {
  const [error, setError] = useState<string | null>(null);
  const {getFavoriteSongsIdsMutation} = useFavorite();

  const fetchConfirmLikeSongIds = async (
    songIds: number[],
    onSuccessHandler: (response: ApiResponse<number[]>) => void,
  ) => {
    try {
      getFavoriteSongsIdsMutation.mutate(songIds, {
        onSuccess: onSuccessHandler,
        onError: (err: any) => {
          setError(err.message);
        },
      });
    } catch (err: any) {
      setError(err.message);
    }
  };
  return {error, fetchConfirmLikeSongIds};
}

export default useFavoriteInfo;
