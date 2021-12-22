const STORAGE_ACCESS_TOKEN_KEY = '@STORAGE_ACCESS_TOKEN_KEY';
const STORAGE_CURRENT_USER_KEY = '@STORAGE_CURRENT_USER_KEY';

export default class AuthStorage {
  storage?: Storage;

  constructor() {
    if (typeof window !== 'undefined') {
      this.storage = window.localStorage;
    }
  }

  public setAccessToken(token: string) {
    this.storage?.setItem(STORAGE_ACCESS_TOKEN_KEY, token);
  }

  public getAccessToken() {
    return this.storage?.getItem(STORAGE_ACCESS_TOKEN_KEY);
  }

  public setCurrentUser(user: any) {
    this.storage?.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
  }

  public getCurrentUser() {
    return JSON.parse(this.storage?.getItem(STORAGE_CURRENT_USER_KEY) ?? '');
  }
}
