import {ApiResponse, PageData} from '@/types/common';
import instance from '../axios';
import {Song} from '@/types/domain';
import apiEndpoints from '../apiEndpoints';

const getSongs = async (
  keyword: string,
  page = 0,
): Promise<ApiResponse<PageData<Song>>> => {
  const response = await instance.get(
    apiEndpoints.fetchSongs + `?keyword=${keyword}&page=${page}`,
  );

  return response.data;
};

export {getSongs};
