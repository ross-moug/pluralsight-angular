import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  allBooks,
  allReaders
} from '../data';
import { Book} from '../models/book';
import { OldBook } from '../models/oldBook';
import { Reader } from '../models/reader';
import { LoggerService } from './logger.service';

@Injectable()
export class DataService {

  constructor(
    private loggerService: LoggerService,
    private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>("/api/books");
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`, {
      headers : new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "my-token"
      })
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`, {
      headers : new HttpHeaders({
        "Accept": "application/json",
        "Authorization": "my-token"
      })
    })
    .pipe(
      map(book => <OldBook> {
        bookTitle: book.title,
        year: book.publicationYear
      }),
      tap(classicBook => console.log(classicBook)));
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>("/api/books", book, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${book.bookID}`, book, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookId}`);
  }
}
