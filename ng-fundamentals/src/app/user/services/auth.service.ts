import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import {
  catchError,
  tap
} from 'rxjs/operators';
import { User } from '../components/models/user.model';

interface LoginInformation {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(
    private http: HttpClient) {
  }

  loginUser(username: string, password: string): Observable<User> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>('/api/login', {
      username: username,
      password: password
    }, options)
      .pipe(catchError(() => of(false)),
        tap(
          data => this.currentUser = data['user']
        ));
  }

  checkAuthenticationStatus(): void {
    this.http.get<User>('/api/currentIdentity')
      .pipe(catchError(this.handleError<User>('checkAuthenticationStatus')),
        tap(
          data => this.currentUser = data
        ))
      .subscribe();
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string): Observable<User> {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<User>(`/api/users/${this.currentUser.id}`, this.currentUser, options)
      .pipe(catchError(this.handleError<User>('updateCurrentUser')));
  }

  logoutUser(): Observable<void> {
    this.currentUser = undefined;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<void>('/api/logout', {}, options)
      .pipe(catchError(this.handleError<void>('logoutUser')));
  }

  private handleError<T>(operation: string = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(operation + ': an error was encountered: ' + error);
      return of(result as T);
    };
  }
}
