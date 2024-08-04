import instance from '../axios';
import apiEndpoints from '../apiEndpoints';
import {ApiResponse} from '@/types/common';
import {ResponseModelScore, ResponseModelUpload} from '@/types/response';
import {RequestModelScore} from '@/types/request';

const uploadRecordFile = async (
  formData: any,
): Promise<ApiResponse<ResponseModelUpload>> => {
  const {data: res} = await instance.post(
    apiEndpoints.uploadRecordFile,
    formData,
    {
      headers: {
        'Content-Type':
          'multipart/form-data; boundary=<calculated when request is sent>',
      },
    },
  );

  return res;
};

const uploadRecordFile2 = async (
  formData: FormData,
): Promise<ApiResponse<ResponseModelUpload>> => {
  const {data} = await instance.post(apiEndpoints.uploadRecordFile2, formData, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });

  return data;
};

const getModelScore = async (
  request: RequestModelScore,
): Promise<ApiResponse<ResponseModelScore>> => {
  const {data} = await instance.post(apiEndpoints.fetchModelScore, request);

  return data;
};

export {uploadRecordFile, uploadRecordFile2, getModelScore};
