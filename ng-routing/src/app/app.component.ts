import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event
} from '@angular/router';
import { MessageService } from "./messages/message.service";

import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  pageTitle = 'Acme Product Management';
  loading = true;

  constructor(private authService: AuthService,
              private router: Router,
              public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(
      event => this.handleEvent(event)
    );
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['message'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.messageService.isDisplayed = false;
  }

  private handleEvent(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
