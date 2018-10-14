import { Injectable } from '@angular/core';
import { Session } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VoterService {
  userHasVoted(session: Session, username: string): boolean {
    return session.voters.some(voter => voter === username);
  }

  addVoter(session: Session, username: string): void {
    session.voters.push(username);
  }

  deleteVoter(session: Session, username: string): void {
    session.voters = session.voters.filter(voter => voter !== username);
  }
}
