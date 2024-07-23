import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

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

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

export type {
  ApiResponse,
  ResponseError,
  PageData,
  UseMutationCustomOptions,
  UseQueryCustomOptions,
};
