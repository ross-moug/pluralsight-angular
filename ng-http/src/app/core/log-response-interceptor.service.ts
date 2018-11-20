import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable()
export class LogResponseInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogResponseInterceptorService: ${req.url}`);

    return next.handle(req)
      .pipe(tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }));
  }
}
