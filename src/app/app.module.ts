import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventThumbnailComponent } from './components/event-thumbnail/event-thumbnail.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { EventService } from './services/event.service';
import { ToastService } from './services/toast.service';
import { EventsDetailsComponent } from './components/events-details/events-details.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventsDetailsComponent,
    CreateEventComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    EventService,
    ToastService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
