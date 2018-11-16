import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AccountService } from './core/account.service';
import { AuthService } from './core/auth.service';
import { UserProfile } from './model/user-profile';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  userProfile: UserProfile;
  firstLogin = false;

  constructor(
    private _acctService: AccountService,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (window.location.href.indexOf('?postLogout=true')) {
      this.authService.signoutRedirectCallback().then(() => {
        const url: string = this.router.url.substring(0, this.router.url.indexOf('?'));
        this.router.navigateByUrl(url);
      });
    }
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.authContext
      && this.authService.authContext.claims
      && !!this.authService.authContext.claims.find(
        claim => claim.type === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' && claim.value === 'Admin');
  }
}
