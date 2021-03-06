import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductGuardService } from './product-guard.service';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductResolverService } from './product-resolver.service';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent, pathMatch: 'full' },
      { path: 'products/:id', component: ProductDetailComponent, resolve: { product: ProductResolverService } },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
        resolve: { product: ProductResolverService },
        canDeactivate: [ProductGuardService], 
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'tag', component: ProductEditTagsComponent },
        ]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
  ],
  providers: [
    ProductService,
    ProductResolverService,
  ]
})
export class ProductModule {
}
