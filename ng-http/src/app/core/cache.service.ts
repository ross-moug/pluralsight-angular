import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  private cache: { [url: string]: HttpResponse<any> } = {};

  constructor() {
  }

  put(url: string, response: HttpResponse<any>): void {
    this.cache[url] = response;
  }

  get(url: string): HttpResponse<any> | undefined {
    return this.cache[url];
  }

  invalidateUrl(url: string): void {
    this.cache[url] = undefined;
  }

  invalidateCache(): void {
    this.cache = {};
  }
}
