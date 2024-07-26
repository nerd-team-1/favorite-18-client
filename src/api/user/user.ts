import {ApiResponse} from '@/types/common';
import instance from '../axios';
import apiEndpoints from '../apiEndpoints';
import {UserProfile} from '@/types/domain';
import {RequestUserUpdateNickname} from '@/types/request';

const getProfile = async (): Promise<ApiResponse<UserProfile>> => {
  const {data} = await instance.get(apiEndpoints.fetchUserProfile);

  return data;
};

const updateNickname = async (
  body: RequestUserUpdateNickname,
): Promise<ApiResponse<UserProfile>> => {
  const {data} = await instance.put(apiEndpoints.fetchUserUpdateNickname, body);

  return data;
};

export {getProfile, updateNickname};
