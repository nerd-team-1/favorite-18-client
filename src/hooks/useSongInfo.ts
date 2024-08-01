import {Song} from '@/types/domain';
import {useState} from 'react';
import {ApiResponse, PageData} from '@/types/common';
import {useSong} from './queries/useSong';

function useSongInfo() {
  const [error, setError] = useState<string | null>(null);
  const {findSongByIdMutation, findSongsByKeywordMutation} = useSong();

  const fetchSong = async (
    songId: number,
    onSuccessHandler: (response: ApiResponse<Song>) => void,
  ) => {
    try {
      findSongByIdMutation.mutate(songId, {
        onSuccess: onSuccessHandler,
        onError: (err: any) => {
          setError(err.message);
        },
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchSongs = async (
    keyword: string,
    page: number,
    onSuccessHandler: (response: ApiResponse<PageData<Song>>) => void,
  ) => {
    try {
      findSongsByKeywordMutation.mutate(
        {keyword, page},
        {
          onSuccess: onSuccessHandler,
          onError: (err: any) => {
            setError(err.message);
          },
        },
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {error, fetchSong, fetchSongs};
}

export {useSongInfo};
