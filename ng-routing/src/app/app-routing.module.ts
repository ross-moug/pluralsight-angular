import { NgModule } from '@angular/core';
import {
  Route,
  RouterModule
} from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { AuthGuardService } from './user/auth-guard.service';

const routes: Route[] = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    canActivate: [AuthGuardService],
    loadChildren: './products/product.module#ProductModule',
    data: {
      preload: true
    },
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: SelectivePreloadingStrategyService })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
