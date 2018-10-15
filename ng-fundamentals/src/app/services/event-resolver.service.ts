import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from '../models';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolverService implements Resolve<Event> {

  constructor(private eventService: EventService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Event> {
    return this.eventService.getEvent(+route.params['id']);
  }
}
