import {getSong, getSongs} from '@/api/song/song';
import {ApiResponse, PageData, UseMutationCustomOptions} from '@/types/common';
import {Song} from '@/types/domain';
import {MutationFunction, useMutation} from '@tanstack/react-query';

function useFindSong<T>(
  songApi: MutationFunction<ApiResponse<Song>, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: songApi,
    ...mutationOptions,
  });
}

function useFindSongs<T>(
  songApi: MutationFunction<ApiResponse<PageData<Song>>, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: songApi,
    ...mutationOptions,
  });
}

function useFindSongById(mutationOptions?: UseMutationCustomOptions) {
  return useFindSong(getSong, mutationOptions);
}

function useFindSongsByKeyword(mutationOptions?: UseMutationCustomOptions) {
  return useFindSongs(getSongs, mutationOptions);
}

function useSong() {
  const findSongByIdMutation = useFindSongById();
  const findSongsByKeywordMutation = useFindSongsByKeyword();

  return {findSongByIdMutation, findSongsByKeywordMutation};
}

export {useSong};
