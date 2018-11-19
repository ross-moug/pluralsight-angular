import { takeWhile } from 'rxjs/operators';
import { DataService } from './../core/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Reader } from '../models/reader';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: []
})
export class AddReaderComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-inferrable-types
  private isComponentActive: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  saveReader(formValues: any): void {
    const newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
    this.dataService.addReader(newReader)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(
        data => console.log(`Successfully created reader with ID ${data.readerID}`),
        error => console.error(error)
      );
  }
}
