import {ApiResponse} from '@/types/common';
import instance from '../axios';
import requests from '../request';
import {UserProfile} from '@/types/domain';

const getProfile = async (): Promise<ApiResponse<UserProfile>> => {
  const {data} = await instance.get(requests.fetchUserProfile);

  return data;
};

export {getProfile};
