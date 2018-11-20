import { AddHeaderInterceptorService } from './add-header-interceptor.service';
import {
  NgModule,
  Optional,
  SkipSelf,
  ErrorHandler
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksResolverService } from './books-resolver.service';

import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LoggerService,
    DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService },
    BooksResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptorService, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
