import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import {
  Observable,
  throwError
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../models/book';
import { BookTrackerError } from '../models/bookTrackerError';
import { DataService } from './data.service';

@Injectable()
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

  constructor(private dataService: DataService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks()
      .pipe(catchError(error => throwError(error)));
  }
}
