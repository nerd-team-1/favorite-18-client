import {ApiResponse} from '@/types/common';
import instance from '../axios';
import apiEndpoints from '../apiEndpoints';
import {ResponseRankScore} from '@/types/response';

const addSongRankCount = async (songId: number): Promise<ApiResponse<void>> => {
  const response = await instance.post(
    `${apiEndpoints.fetchRanking}/${songId}`,
  );

  return response.data;
};

const getSongRankList = async (): Promise<ResponseRankScore> => {
  const {data} = await instance.get(apiEndpoints.fetchRanking);

  return data;
};

export {addSongRankCount, getSongRankList};
