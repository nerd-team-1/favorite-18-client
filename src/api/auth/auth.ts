import {ApiResponse} from '@/types/common';
import instance from '../axios';
import requests from '../request';

const getGoogleLoginUrl = async (): Promise<ApiResponse<string>> => {
  const response = await instance.get(requests.fetchAuthLoginGoogleUrl);

  return response.data;
};

export {getGoogleLoginUrl};
