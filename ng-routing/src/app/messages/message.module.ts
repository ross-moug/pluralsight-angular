import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MessageRoutingModule } from './message-routing.module';

import { MessageComponent } from './message.component';
import { MessageService } from './message.service';

@NgModule({
  imports: [
    SharedModule,
    MessageRoutingModule,
  ],
  declarations: [
    MessageComponent
  ],
  providers: [
    MessageService
  ]
})
export class MessageModule {
}
