import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Session } from '../../models';
import { AuthService } from '../../user/services/auth.service';
import { VoterService } from '../../services/index';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
  @Input()
  sessions: Session[];
  @Input()
  filterBy: string;
  @Input()
  sortBy: string;
  @Input()
  eventId: number;
  visibleSessions: Session[];

  constructor(
    public authService: AuthService,
    private voterService: VoterService
  ) {}

  ngOnChanges(): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortSessions(this.sortBy)
    }
  }

  filterSessions(filter: string): void {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
  sortSessions(sorting: string): void {
    sorting === 'name' ? this.visibleSessions.sort((s1, s2) => this.sortByNameAsc(s1, s2))
      : this.visibleSessions.sort((s1, s2) => this.sortByVotesDesc(s1, s2));
  }

  toggleVote(session: Session): void {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.authService.currentUser.username);
    } else {
      this.voterService.addVoter(this.eventId, session, this.authService.currentUser.username);
    }

    if (this.sortBy === 'votes') {
      this.visibleSessions.sort((s1, s2) => this.sortByVotesDesc(s1, s2));
    }
  }
  
  userHasVoted(session: Session): boolean {
    return this.voterService.userHasVoted(session, this.authService.currentUser.username);
  }

  private sortByNameAsc(session1: Session, session2: Session): number {
    if (session1.name > session2.name) {
      return 1;
    } else if (session1.name < session2.name) {
      return -1;
    } else {
      return 0;
    }
  }

  private sortByVotesDesc(session1: Session, session2: Session): number {
    return session2.voters.length - session1.voters.length;
  }
}
