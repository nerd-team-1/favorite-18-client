import {Platform} from 'react-native';

const urls = {
  serverUrl:
    Platform.OS === 'ios' ? 'http://localhost:3030' : 'http://10.0.2.2:8080',
} as const;

export {urls};
