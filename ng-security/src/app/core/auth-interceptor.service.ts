import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(Constants.apiRoot)) {
      const authRequest: HttpRequest<any> = req.clone(this.addBearerHeader(req.headers));
      return next.handle(authRequest);
    }

    return next.handle(req);
  }

  private addBearerHeader(headers: HttpHeaders): { headers: HttpHeaders } {
    return { headers: headers.set('Authorization', `Bearer ${this.authService.getAccessToken()}`) };
  }
}
