import {ApiResponse} from '@/types/common';
import instance from '../axios';
import apiEndpoints from '../apiEndpoints';

const addSongRankCount = async (songId: number): Promise<ApiResponse<void>> => {
  const response = await instance.post(
    `${apiEndpoints.addSongRankCount}/${songId}`,
  );

  return response.data;
};

export {addSongRankCount};
