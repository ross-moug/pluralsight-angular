import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore
} from 'oidc-client';
import { Constants } from '../constants';
import { AuthContext } from '../model/auth-context';
import { Utils } from './utils';

@Injectable()
export class AuthService {
  authContext: AuthContext;

  private readonly config: UserManagerSettings = {
    authority: Constants.stsAuthority,
    client_id: Constants.clientId,
    redirect_uri: `${Constants.clientRoot}assets/oidc-login-redirect.html`,
    scope: 'openid projects-api profile',
    response_type: 'id_token token',
    post_logout_redirect_uri: `${Constants.clientRoot}?postLogout=true`,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
    silent_redirect_uri: `${Constants.clientRoot}assets/silent-redirect.html`,
  };

  private userManager: UserManager;
  private user: User;

  constructor(private http: HttpClient) {
    this.userManager = new UserManager(this.config);

    this.userManager.getUser().then(user => {
      if (user && !user.expired) {
        this.user = user;
        this.loadSecurityContext();
      }
    });

    this.userManager.events.addUserLoaded(() => {
      this.userManager.getUser().then(user => {
        this.user = user;
        this.loadSecurityContext();
      });
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

  loadSecurityContext(): void {
    this.http.get<AuthContext>(`${Constants.apiRoot}Account/AuthContext`)
      .subscribe(
        context => this.authContext = context,
        error => console.error(Utils.formatError(error))
      );
  }
}
