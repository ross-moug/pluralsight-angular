import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent}
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuardService,
  ]
})
export class UserModule { }
