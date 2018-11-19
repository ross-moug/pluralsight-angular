import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  allBooks,
  allReaders
} from '../data';
import { Book } from '../models/book';
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

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }
}
