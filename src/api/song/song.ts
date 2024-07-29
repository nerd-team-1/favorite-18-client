import {ApiResponse, PageData} from '@/types/common';
import instance from '../axios';
import {Song} from '@/types/domain';
import apiEndpoints from '../apiEndpoints';

const getSongs = async (
  keyword: string,
  page = 0,
): Promise<ApiResponse<PageData<Song>>> => {
  const response = await instance.get(
    apiEndpoints.fetchSong + `?keyword=${keyword}&page=${page}`,
  );

  return response.data;
};

const getSong = async (songId: number): Promise<ApiResponse<Song>> => {
  const response = await instance.get(apiEndpoints.fetchSong + `/${songId}`);

  return response.data;
};

const getFavorite = async (
  songIds: number[],
): Promise<ApiResponse<number[]>> => {
  const ids = songIds.join(',');
  const response = await instance.get(
    apiEndpoints.fetchConfirmLikeSong + `?songIds=${ids}`,
  );

  return response.data;
};

const addFavorite = async (songId: number): Promise<ApiResponse<void>> => {
  const response = await instance.post(
    `${apiEndpoints.defaultFavorite}/${songId}`,
  );

  return response.data;
};

const removeFavorite = async (songId: number): Promise<ApiResponse<void>> => {
  const response = await instance.delete(
    `${apiEndpoints.defaultFavorite}/${songId}`,
  );

  return response.data;
};

export {getSongs, getSong, getFavorite, addFavorite, removeFavorite};
