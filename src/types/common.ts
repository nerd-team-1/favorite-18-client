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

interface ApiResponse<T> {
  result: string;
  data: T;
  error: string | null;
}

interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

interface PageData<T> {
  content: T[];
  page: Page;
}

export type {RequestUser, ApiResponse, ResponseError, PageData};
