import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from '../../user/services/auth.service';
import { Session, Event } from '../../models';
import { EventService } from '../../services';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  searchTerm: string = '';
  foundSessions: Session[] = [];
  events: Event[] = [];

  constructor(
    public authService: AuthService,
    private eventService: EventService) {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  searchSessions(searchTerm: string): void {
    this.eventService.searchSessions(searchTerm).subscribe(
      sessions => this.foundSessions = sessions
    );
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(
      events => this.events = events
    );
  }
}
