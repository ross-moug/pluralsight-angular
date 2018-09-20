import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
    events: any;

    constructor(
        private eventService: EventService,
        private toastService: ToastService) {}

    ngOnInit(): void {
        this.events = this.eventService.getEvents();
    }

    handleThumbnailClick(eventName: string): void {
        this.toastService.success(eventName)
    }
}
