import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
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
    ProjectService,
    AccountService,
    AuthService,
  ],
})
export class CoreModule {
}
