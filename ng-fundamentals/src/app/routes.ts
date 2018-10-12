import { Routes } from '@angular/router';
import { CreateSessionComponent } from './components';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EventsDetailsComponent } from './components/events-details/events-details.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { EventRouteActivatorGuard } from './guards/event-route-activator.guard';
import { EventListResolverService } from './services/event-list-resolver.service';

export const routes: Routes = [
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  {
    path: 'events', component: EventsListComponent, resolve: {
      events: EventListResolverService
    }
  },
  { path: 'events/:id', component: EventsDetailsComponent, canActivate: [EventRouteActivatorGuard] },
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
];