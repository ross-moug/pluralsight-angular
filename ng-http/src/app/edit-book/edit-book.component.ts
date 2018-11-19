import { takeWhile } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../models/book';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit, OnDestroy {

  selectedBook: Book;

  private isComponentActive: boolean = true;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
    const bookId: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookId)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(
        data => this.selectedBook = data,
        error => console.error(error),
        () => console.log(`Finished retrieving book with ID ${bookId}`)
      );
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    console.warn('Save changes to book not yet implemented.');
  }
}
