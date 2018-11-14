import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserManager,
  UserManagerSettings,
  WebStorageStateStore
} from 'oidc-client';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly config: UserManagerSettings = {
    authority: Constants.stsAuthority,
    client_id: Constants.clientId,
    redirect_uri: `${Constants.clientRoot}assets/oidc-login-redirect.html`,
    scope: 'openid projects-api profile',
    response_type: 'id_token token',
    post_logout_redirect_uri: `${Constants.clientRoot}`,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  };

  private userManager: UserManager;

  constructor(private http: HttpClient) {
    this.userManager = new UserManager(this.config);
  }

  login(): Promise<any> {
    return this.userManager.signinRedirect();
  }
}
