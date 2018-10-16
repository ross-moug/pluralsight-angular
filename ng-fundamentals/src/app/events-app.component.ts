import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from './user/services/auth.service';

@Component({
  selector: 'events-app',
  template: `
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
  `
})
export class EventsAppComponent implements OnInit{
  constructor(
    private authService: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.authService.checkAuthenticationStatus();
  }
}
