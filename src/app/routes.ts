import { Routes } from '@angular/router';
import { EventsDetailsComponent } from './components/events-details/events-details.component';
import { EventsListComponent } from './components/events-list/events-list.component';

export const routes: Routes = [
    { path: 'events', component: EventsListComponent },
    { path: 'events/:id', component: EventsDetailsComponent },
    { path: '', component: EventsListComponent, pathMatch: 'full' },
];
