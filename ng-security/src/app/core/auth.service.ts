import { Constants } from './../constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore
} from 'oidc-client';

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
    metadata: {
      authorization_endpoint: `${Constants.stsAuthority}authorize?audience=projects-api`,
      issuer: `${Constants.stsAuthority}`,
      jwks_uri: `${Constants.stsAuthority}.well-known/jwks.json`,
      end_session_endpoint: `${Constants.stsAuthority}v2/logout?returnTo=${Constants.clientRoot}?postLogout=true`,
    }
  };

  private userManager: UserManager;
  private user: User;

  constructor(private http: HttpClient) {
    this.userManager = new UserManager(this.config);

    this.userManager.getUser().then(user => {
      if (user && !user.expired) {
        this.user = user;
      }
    })
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
