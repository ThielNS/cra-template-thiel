import axios, { AxiosError, AxiosInstance } from 'axios';
import AuthStorage from './auth/authStorage';
import { AuthServiceAccessResponse } from './auth/types';
import { SERVICE_BASE_URL } from './config';

const instance = axios.create({ baseURL: SERVICE_BASE_URL });

export default class ServiceBase {
  protected service: AxiosInstance;
  authStorage: AuthStorage;

  constructor() {
    this.service = instance;

    this.authStorage = new AuthStorage();
    const accessToken = this.authStorage.getAccessToken();

    if (accessToken) {
      this.setHeaderAuthorization(accessToken);
    }
  }

  getService() {
    return this.service;
  }

  protected setHeaderAuthorization(token: string) {
    const authToken = `Bearer ${token}`;

    this.service.defaults.headers.common['Authorization'] = authToken;
  }

  protected setInterceptorsRequest() {
    // Interceptor Request
  }

  protected setInterceptorsResponse() {
    this.service.interceptors.response.use(
      (request) => request,
      this.interceptorResponseError,
    );
  }

  protected async interceptorResponseError(error: AxiosError) {
    // 401
    if (error.response?.status === 401 && this.authStorage.getAccessToken()) {
      return await this.handler401(error);
    }

    // 403
    if (error.response?.status === 403) {
      return await this.redirectPageError(error);
    }

    // 500
    if (error.response?.status === 500) {
      return await this.redirectPageError(error);
    }

    return Promise.reject(error);
  }

  protected async handler401(error: AxiosError) {
    // TODO: Review this refresh token
    return new Promise(async (resolve, reject) => {
      const configUrl = error.config.url;

      try {
        if (
          this.authStorage &&
          this.authStorage.getAccessToken() &&
          !configUrl?.split('/').includes('refresh')
        ) {
          await this.service
            .request<AuthServiceAccessResponse>({
              headers: {
                Authorization: `Bearer ${this.authStorage.getAccessToken()}`,
              },
              url: '/auth/refresh',
              method: 'POST',
            })
            .then(async ({ data }) => {
              const accessToken = `Bearer ${data.accessToken}`;

              this.authStorage.setAccessToken(data.accessToken);

              await this.service
                .request({
                  ...error.config,
                  headers: { Authorization: accessToken },
                })
                .then((res) => resolve(res))
                .catch(() => {
                  this.authStorage.setAccessToken('');
                  this.authStorage.setCurrentUser(null);

                  reject(error);
                });
            });
        } else {
          this.authStorage.setAccessToken('');
          this.authStorage.setCurrentUser(null);

          reject(new Error('Invalid token.'));
        }
      } catch (error) {
        this.authStorage.setAccessToken('');
        this.authStorage.setCurrentUser(null);

        reject(error);
      }
    });
  }

  protected redirectPageError(error: AxiosError) {
    if (window.location) {
      window.location.href = `/${String(error.response?.status)}`;
    }

    return Promise.reject(error);
  }
}
