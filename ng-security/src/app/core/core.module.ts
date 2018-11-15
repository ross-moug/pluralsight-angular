import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from "@angular/common/http";
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';
import { ProjectService } from './project.service';
import { AccountService } from './account.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    ProjectService,
    AccountService,
    AuthService,
  ],
})
export class CoreModule {
}
