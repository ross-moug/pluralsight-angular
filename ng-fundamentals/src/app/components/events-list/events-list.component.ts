import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models';
import { EventService } from '../../services/event.service';

@Component({
    templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
    events: Event[];

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.events = this.route.snapshot.data['events'];
    }
}
