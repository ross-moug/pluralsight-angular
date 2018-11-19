import {
  Component,
  OnInit,
  OnDestroy,
  VERSION
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { DataService } from '../core/data.service';
import { Book } from '../models/book';
import { Reader } from '../models/reader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  private isComponentActive: boolean = true;

  constructor(private dataService: DataService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.dataService.getAllBooks()
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(
        data => this.allBooks = data,
        error => console.error(error),
        () => console.log("Finished retrieving books"));

    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
    .pipe(takeWhile(() => this.isComponentActive))
    .subscribe(
      () => {
        const index: number = this.allBooks.findIndex(book => book.bookID === bookID);
        this.allBooks.splice(index, 1);
      },
      error => console.error(error)
    );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
