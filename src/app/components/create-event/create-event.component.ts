import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router'

import { EventService } from '../../services';
import { Event } from '../models';

@Component({
  templateUrl: './create-event.component.html',
  styles: [`
      em {
          float: right;
          color: #E05C65;
          padding-left: 10px;
      }

      .error input {
          background-color: #E3C3C5;
      }

      .error ::-webkit-input-placeholder {
          color: #999;
      }

      .error ::-moz-placeholder {
          color: #999;
      }

      .error :-moz-placeholder {
          color: #999;
      }

      .error :-ms-input-placeholder {
          color: #999;
      }
  `]
})
export class CreateEventComponent {
  isDirty = true;
  event: Event;

  constructor(
    private router: Router,
    private eventService: EventService) {}

  cancel(): void {
    this.router.navigate(['/events']);
  }

  saveEvent(value: any): void {
    this.eventService.saveEvent(value);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }
}
