import {
  addFavorite,
  getFavorite,
  getSong,
  getSongs,
  removeFavorite,
} from '@/api/song/song';
import {ApiResponse, UseMutationCustomOptions} from '@/types/common';
import {Song} from '@/types/domain';
import {MutationFunction, useMutation} from '@tanstack/react-query';

function useFavoriteSong<T>(
  favoriteApi: MutationFunction<ApiResponse<void>, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: favoriteApi,
    ...mutationOptions,
  });
}

function useFindFavoriteSongByIds<T>(
  favoriteApi: MutationFunction<ApiResponse<number[]>, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: favoriteApi,
    ...mutationOptions,
  });
}

function useAddFavoriteSong(mutationOptions?: UseMutationCustomOptions) {
  return useFavoriteSong(addFavorite, mutationOptions);
}

function useRemoveFavoriteSong(mutationOptions?: UseMutationCustomOptions) {
  return useFavoriteSong(removeFavorite, mutationOptions);
}

function useGetFavoriteSongsIds(mutationOptions?: UseMutationCustomOptions) {
  return useFindFavoriteSongByIds(getFavorite, mutationOptions);
}

function useFavorite() {
  const addFavoriteSongMutation = useAddFavoriteSong();
  const removeFavoriteSongMutation = useRemoveFavoriteSong();
  const getFavoriteSongsIdsMutation = useGetFavoriteSongsIds();

  return {
    addFavoriteSongMutation,
    removeFavoriteSongMutation,
    getFavoriteSongsIdsMutation,
  };
}

export {useFavorite};
