import {
  Component,
  OnInit,
  VERSION
} from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { DataService } from '../core/data.service';
import { Book } from '../models/book';
import { Reader } from '../models/reader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title) {
  }

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
