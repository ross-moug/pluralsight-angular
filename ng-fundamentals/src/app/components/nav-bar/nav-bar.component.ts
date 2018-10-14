import { Component } from '@angular/core';
import { AuthService } from '../../user/services/auth.service';
import { Session } from '../../models';
import { EventService } from '../../services';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  searchTerm: string = '';
  foundSessions: Session[] = [];

  constructor(
    public authService: AuthService,
    private eventService: EventService) {
    }

  searchSessions(searchTerm: string): void {
    this.eventService.searchSessions(searchTerm).subscribe(
      sessions => this.foundSessions = sessions
    );
  }
}
