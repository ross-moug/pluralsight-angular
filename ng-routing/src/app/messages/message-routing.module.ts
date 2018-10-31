import { NgModule } from '@angular/core';
import {
  Route,
  RouterModule
} from '@angular/router';
import { MessageComponent } from './message.component';

const routes: Route[] = [
  {
    path: 'message',
    component: MessageComponent,
    outlet: 'popup'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessageRoutingModule { }
