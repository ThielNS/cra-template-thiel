/**
 *
 * Auth Service
 *
 */

import ServiceBase from 'modules/services/ServiceBase';
import AuthStorage from './authStorage';
import { AuthServiceAccessProps, AuthServiceAccessResponse } from './types';

export default class AuthService extends ServiceBase {
  baseUrl = '/auth';
  authStorage: AuthStorage;

  constructor() {
    super();

    this.authStorage = new AuthStorage();
  }

  public async access(data: AuthServiceAccessProps) {
    return this.service
      .post<AuthServiceAccessResponse>(`${this.baseUrl}/access`, data)
      .then((response) => {
        const { accessToken, user } = response.data;

        this.setHeaderAuthorization(accessToken);
        this.authStorage.setAccessToken(accessToken);
        this.authStorage.setCurrentUser(user);

        return response;
      });
  }
}
