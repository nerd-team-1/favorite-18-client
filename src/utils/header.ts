import instance from '@/api/axios';

function setHeader(key: string, value: string) {
  instance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  if (!instance.defaults.headers.common[key]) {
    return;
  }

  delete instance.defaults.headers.common[key];
}

function getHeader(key: string) {
  return instance.defaults.headers.common[key];
}

export {setHeader, removeHeader, getHeader};
