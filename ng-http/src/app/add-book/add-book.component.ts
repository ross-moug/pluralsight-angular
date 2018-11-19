import { takeWhile } from 'rxjs/operators';
import { DataService } from './../core/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit, OnDestroy {

  private isComponentActive: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  saveBook(formValues: any): void {
    const newBook: Book = <Book>formValues;
    newBook.bookID = 0;
    this.dataService.addBook(newBook)
    .pipe(takeWhile(() => this.isComponentActive))
    .subscribe(
      data => console.log(data),
      error => console.error(error));
  }
}
