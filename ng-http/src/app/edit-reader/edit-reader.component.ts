import { takeWhile } from 'rxjs/operators';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reader } from '../models/reader';
import { DataService } from '../core/data.service';
import { BadgeService } from '../services/badge.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers: [BadgeService]
})
export class EditReaderComponent implements OnInit, OnDestroy {

  selectedReader: Reader;
  currentBadge: string;

  // tslint:disable-next-line:no-inferrable-types
  private isComponentActive: boolean = true;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private badgeService: BadgeService) {
  }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const readerID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getReaderById(readerID)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(data => this.selectedReader = data);

    this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  saveChanges(): void {
    this.dataService.updateReader(this.selectedReader)
      .pipe(takeWhile(() => this.isComponentActive))
      .subscribe(
        () => console.log(`Reader ${this.selectedReader.readerID} has been updated`),
        error => console.error(error)
      );
  }
}
