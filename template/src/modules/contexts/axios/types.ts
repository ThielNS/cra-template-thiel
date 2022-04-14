import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { ReactNode } from 'react';

interface HeadersDefaults {
  common?: AxiosRequestHeaders;
  delete?: AxiosRequestHeaders;
  get?: AxiosRequestHeaders;
  head?: AxiosRequestHeaders;
  post?: AxiosRequestHeaders;
  put?: AxiosRequestHeaders;
  patch?: AxiosRequestHeaders;
  options?: AxiosRequestHeaders;
  purge?: AxiosRequestHeaders;
  link?: AxiosRequestHeaders;
  unlink?: AxiosRequestHeaders;
}

export interface AxiosProviderProps {
  axiosInstance: AxiosInstance;
  config?: {
    defaults: Omit<AxiosRequestConfig, 'headers'> & {
      headers: HeadersDefaults;
    };

    interceptors?: {
      request?: {
        onFulfilled?: <T = AxiosRequestConfig>(value: T) => T | Promise<T>;
        onRejected?: (error: any) => any;
      };
      response?: {
        onFulfilled?: <T = AxiosResponse>(value: T) => T | Promise<T>;
        onRejected?: (error: any) => any;
      };
    };
  };
  children: ReactNode;
}

export interface AxiosContextProps {
  axiosInstance: AxiosInstance;
}
