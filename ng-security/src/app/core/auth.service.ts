import { Injectable } from '@angular/core';
import {
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore
} from 'oidc-client';
import { Constants } from '../constants';

@Injectable()
export class AuthService {
  private readonly config: UserManagerSettings = {
    authority: Constants.stsAuthority,
    client_id: Constants.clientId,
    redirect_uri: `${Constants.clientRoot}assets/oidc-login-redirect.html`,
    scope: 'openid projects-api profile',
    response_type: 'id_token token',
    post_logout_redirect_uri: `${Constants.clientRoot}?postLogout=true`,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  };

  private userManager: UserManager;
  private user: User;

  constructor() {
    this.userManager = new UserManager(this.config);

    this.userManager.getUser().then(user => {
      if (user && !user.expired) {
        this.user = user;
      }
    });
  }

  isLoggedIn(): boolean {
    return this.user && this.user.access_token && !this.user.expired;
  }

  getAccessToken(): string {
    return this.user ? this.user.access_token : '';
  }

  login(): Promise<any> {
    return this.userManager.signinRedirect();
  }

  logout(): Promise<any> {
    return this.userManager.signoutRedirect();
  }

  signoutRedirectCallback(): Promise<any> {
    return this.userManager.signoutRedirectCallback();
  }
}
