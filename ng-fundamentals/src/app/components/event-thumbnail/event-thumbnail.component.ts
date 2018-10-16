import {
  Component,
  Input,
} from '@angular/core';
import { Event } from '../../models/event.model';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
      <h2>{{ event?.name | uppercase}}</h2>
      <div>Date: {{ event?.date | date: 'dd/MM/yyyy' }}</div>
      <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
          Time: {{event?.time}}
          <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
          <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
          <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Price: {{ event?.price | currency: 'GBP'}}</div>
      <div *ngIf="event?.location">
        <span>Location: {{event?.location?.address}}</span>
        <span class="pad-left">{{event?.location?.city}}, {{event.location?.country}}</span>
      </div>
      <div *ngIf="event?.onlineUrl">
          Online URL: {{event?.onlineUrl}}
      </div>
    </div>
  `,
  styles: [`
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
    .thumbnail { min-height: 240px;}
    .green { color: #003300 !important; }
    .bold { font-weight: bold; }
  `]
})
export class EventThumbnailComponent {

  @Input() event: Event;

  getStartTimeStyle(): any {
    if (this.event && this.event.time === '8:00 am') {
      return { color: '#003300', 'font-weight': 'bold'};
    }

    return {};
  }
}
