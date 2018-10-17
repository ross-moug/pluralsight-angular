import { Injectable } from '@angular/core';
import { Session } from '../models';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(
    private http: HttpClient) {}

  userHasVoted(session: Session, username: string): boolean {
    return session.voters.some(voter => voter === username);
  }

  addVoter(eventId: number, session: Session, username: string): void {
    session.voters.push(username);

    const options: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url: string = `/api/events/${eventId}/sessions/${session.id}/voters/${username}`;
    this.http.post<void>(url, {}, options)
      .pipe(catchError(this.handleError<void>('addVoter')))
      .subscribe();
  }

  deleteVoter(eventId: number, session: Session, username: string): void {
    session.voters = session.voters.filter(voter => voter !== username);

    const options: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url: string = `/api/events/${eventId}/sessions/${session.id}/voters/${username}`;
    this.http.delete<void>(url, options)
      .pipe(catchError(this.handleError<void>('deleteVoter')))
      .subscribe();
  }

  private handleError<T>(operation: string = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(operation + ': an error was encountered: ' + error);
      return of(result as T);
    };
  }
}
