import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { EventsAppComponent } from './events-app.component';
import {
  EventsListComponent,
  EventThumbnailComponent,
  NavBarComponent,
  EventsDetailsComponent,
  CreateEventComponent,
  NotFoundComponent
 } from './components/index';

import {
  EventService,
  ToastService,
  EventListResolverService
} from './services/index';
import { EventRouteActivatorGuard } from './guards/index';
import { CreateSessionComponent } from './components/create-session/create-session.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { CollapisbleWellComponent } from './components/collapisble-well/collapisble-well.component';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventsDetailsComponent,
    CreateEventComponent,
    NotFoundComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapisbleWellComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService,
    ToastService,
    EventRouteActivatorGuard,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState},
    EventListResolverService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  console.log(component.isDirty);
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }

  return true;
}