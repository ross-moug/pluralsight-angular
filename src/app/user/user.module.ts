import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/index';
import { LoginComponent } from './components/login/login.component';
import { userRoutes } from './user.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    ProfileComponent,
    LoginComponent
  ],
  providers: [

  ],
  exports: [
    ProfileComponent,
    LoginComponent
  ]
})
export class UserModule { }
