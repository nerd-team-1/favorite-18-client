import {RequestUser} from '@/types/common';
import instance from '../axios';
import requests from '../request';

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await instance.post(requests.fetchAuthLogin, {
    email,
    password,
  });

  return data;
};

export {postLogin};
export type {ResponseToken};
