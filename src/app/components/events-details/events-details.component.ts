import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models';
import { EventService } from '../../services/event.service';

@Component({
  templateUrl: './events-details.component.html',
  styles: [`
      .container {
          padding-left: 20px;
          padding-right: 20px
      }

      .event-image {
          height: 100px;
      }
  `]
})
export class EventsDetailsComponent implements OnInit {
  event: Event;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    console.log(this.event);
  }

}
