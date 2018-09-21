import { Routes } from '@angular/router';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventsDetailsComponent } from './components/events-details/events-details.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { EventRouteActivatorGuard } from './guards/event-route-activator.guard';

export const routes: Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events', component: EventsListComponent },
    { path: 'events/:id', component: EventsDetailsComponent, canActivate: [EventRouteActivatorGuard] },
    { path: '404', component: NotFoundComponent },
    { path: '', component: EventsListComponent, pathMatch: 'full' },
];
