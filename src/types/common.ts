import {AxiosError} from 'axios';

type RequestUser = {
  email: string;
  password: string;
};

type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

export type {RequestUser, ResponseError};
