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
  NotFoundComponent,
  CreateSessionComponent,
  SessionListComponent,
  CollapsibleWellComponent,
  SimpleModalComponent,
  UpVoteComponent
 } from './components/index';
import {
  EventService,
  TOASTR_TOKEN,
  Toastr,
  EventListResolverService,
  JQUERY_TOKEN,
  VoterService
} from './services/index';
import { EventRouteActivatorGuard } from './guards/index';
import { DurationPipe } from './pipes/index';
import { ModalTriggerDirective, LocationValidatorDirective } from './directives/index';

const toastr: Toastr = window['toastr'];
const jQuery: Object = window['$'];

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
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpVoteComponent,
    LocationValidatorDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    EventRouteActivatorGuard,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState},
    EventListResolverService,
    { provide: JQUERY_TOKEN, useValue: jQuery },
    VoterService
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