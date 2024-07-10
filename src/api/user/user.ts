import instance from '../axios';
import requests from '../request';

const getProfile = async (): Promise<any> => {
  const {data} = await instance.get(requests.fetchUserProfile);

  return data;
};

export {getProfile};
