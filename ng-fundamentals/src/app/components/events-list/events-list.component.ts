import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models';
import { EventService } from '../../services/event.service';
import { ToastService } from '../../services/toast.service';

@Component({
    templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
    events: Event[];

    constructor(
        private eventService: EventService,
        private toastService: ToastService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.events = this.route.snapshot.data['events'];
    }

    handleThumbnailClick(eventName: string): void {
        this.toastService.success(eventName)
    }
}
