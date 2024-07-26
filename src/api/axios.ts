import {urls} from '@/constants';
import axios from 'axios';

const instance = axios.create({
  baseURL: urls.serverUrl,
  withCredentials: true,
});

export default instance;
