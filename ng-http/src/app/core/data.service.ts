import {
  Observable,
  throwError
} from 'rxjs';
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  allBooks
} from '../data';
import { Book } from '../models/book';
import { BookTrackerError } from '../models/bookTrackerError';
import { OldBook } from '../models/oldBook';
import { Reader } from '../models/reader';
import { LoggerService } from './logger.service';

@Injectable()
export class DataService {

  constructor(
    private loggerService: LoggerService,
    private http: HttpClient) {
  }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>('/api/readers');
  }

  getReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`/api/readers/${ id }`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  addReader(reader: Reader): Observable<Reader> {
    return this.http.post<Reader>('/api/readers', reader);
  }

  updateReader(reader: Reader): Observable<void> {
    return this.http.put<void>(`/api/books/${ reader.readerID }`, reader);
  }

  deleteReader(readerId: number): Observable<void> {
    return this.http.delete<void>(`/api/readers/${ readerId }`);
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>('/api/books')
      .pipe(catchError(error => this.handleError(error)));
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${ id }`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${ id }`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    })
      .pipe(
        map(book => <OldBook>{
          bookTitle: book.title,
          year: book.publicationYear
        }),
        tap(classicBook => console.log(classicBook)));
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', book);
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${ book.bookID }`, book);
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${ bookId }`);
  }

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    const bookTrackerError: BookTrackerError = new BookTrackerError();
    bookTrackerError.errorNumber = 100;
    bookTrackerError.message = error.statusText;
    bookTrackerError.friendlyMessage = 'An error occurred retrieving data';
    return throwError(bookTrackerError);
  }
}
