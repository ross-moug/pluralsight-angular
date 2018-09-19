import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventThunbmailComponent } from './event-thunbmail/event-thunbmail.component';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThunbmailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
