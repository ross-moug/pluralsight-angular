import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/account.service';
import { AuthService } from './core/auth.service';
import { UserProfile } from './model/user-profile';
import { MatDialog } from '@angular/material';
import { Utils } from './core/utils';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  login(): void {
    this.authService.login();
  }
}
