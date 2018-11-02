import { NgModule } from '@angular/core';
import {
  Route,
  RouterModule
} from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuardService } from './user/auth-guard.service';

const routes: Route[] = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    canLoad: [AuthGuardService],
    loadChildren: './products/products.module#ProductModule'
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
