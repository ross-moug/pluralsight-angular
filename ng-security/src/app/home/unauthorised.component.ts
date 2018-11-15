import { AuthService } from './../core/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './unauthorised.component.html',
  styleUrls: ['./unauthorised.component.scss'],
})
export class UnauthorisedComponent {

  constructor(
    private authService: AuthService
  ) { }

  logout(): void {
    this.authService.logout();
  }
}
