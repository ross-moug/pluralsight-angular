import {
  Observable,
  of
} from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable()
export class CacheInterceptorService implements HttpInterceptor {

  constructor(private cacheService: CacheService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`CacheInterceptorService: ${req.url}`);

    if (req.method !== 'GET') {
      console.log(`Invalidating cache: ${req.method} ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
    if (cachedResponse) {
      console.log(`Returning a cached response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    return next.handle(req)
      .pipe(tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req.url, event);
        }
      }));
  }
}
