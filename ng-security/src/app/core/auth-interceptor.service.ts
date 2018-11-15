import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from '../constants';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot)) {
      const authRequest: HttpRequest<any> = req.clone(this.addBearerHeader(req.headers));
      return next.handle(authRequest).pipe(tap(
        () => {},
        error => {
          const responseError: HttpErrorResponse = error as HttpErrorResponse;
          if (responseError && (responseError.status === 401 || responseError.status === 403)) {
            this.router.navigate(['unauthorised']);
          }
        }
      ));
    }

    return next.handle(req);
  }

  private addBearerHeader(headers: HttpHeaders): { headers: HttpHeaders } {
    return { headers: headers.set('Authorization', `Bearer ${this.authService.getAccessToken()}`) };
  }
}
