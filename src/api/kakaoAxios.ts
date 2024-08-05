import {urls} from '@/constants';
import axios from 'axios';

const kakaoLocationInstance = axios.create({
  baseURL: urls.kakaoLocationServerUrl,
  withCredentials: true,
});

export default kakaoLocationInstance;
