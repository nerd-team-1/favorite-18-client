import {Platform} from 'react-native';

const urls = {
  serverUrl:
    Platform.OS === 'ios' ? 'http://localhost:3030' : 'http://10.0.2.2:8080',
  prodServerUrl: 'https://favorite18.kr',
  kakaoLocationServerUrl: 'https://dapi.kakao.com',
} as const;

const userGender = {
  MAN: 'MAN',
  WOMAN: 'WOMAN',
} as const;

export {urls, userGender};
