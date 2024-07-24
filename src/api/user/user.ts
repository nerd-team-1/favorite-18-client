import {ApiResponse} from '@/types/common';
import instance from '../axios';
import apiEndpoints from '../apiEndpoints';
import {UserProfile} from '@/types/domain';

const getProfile = async (): Promise<ApiResponse<UserProfile>> => {
  const {data} = await instance.get(apiEndpoints.fetchUserProfile);

  return data;
};

export {getProfile};
