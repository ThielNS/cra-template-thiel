/**
 *
 * AxiosProvider Context
 *
 */

import { AxiosRequestConfig } from 'axios';
import { createContext, useContext, useEffect } from 'react';
import { AxiosProviderProps, AxiosContextProps } from './types';

const AxiosContext = createContext({} as AxiosContextProps);

function AxiosProvider({ axiosInstance, ...props }: AxiosProviderProps) {
  useEffect(() => {
    setDefaults();
    setInterceptors();
  }, [props.config]);

  function setDefaults() {
    if (props.config && props.config.defaults) {
      Object.keys(props.config.defaults).forEach((key) => {
        const defaultKey = key as keyof AxiosRequestConfig;

        axiosInstance.defaults[defaultKey] = props.config?.defaults[defaultKey];
      });
    }
  }

  function setInterceptors() {
    if (props.config?.interceptors) {
      if (props.config.interceptors.request) {
        const { onFulfilled, onRejected } = props.config.interceptors.request;

        axiosInstance.interceptors.request.use(onFulfilled, onRejected);
      }

      if (props.config.interceptors.response) {
        const { onFulfilled, onRejected } = props.config.interceptors.response;

        axiosInstance.interceptors.response.use(onFulfilled, onRejected);
      }
    }
  }

  return (
    <AxiosContext.Provider value={{ axiosInstance }}>
      {props.children}
    </AxiosContext.Provider>
  );
}

export function useAxios() {
  return useContext<AxiosContextProps>(AxiosContext).axiosInstance;
}

export default AxiosProvider;
