import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import { Observable } from 'rxjs';
import {
  map,
  mergeMap,
} from 'rxjs/operators';
import { ProductService } from '../product.service';
import {
  LoadSuccessAction,
  ProductActionType
} from './product.action';

@Injectable({
  providedIn: 'root'
})
export class ProductEffects {

  constructor(
    private actions: Actions,
    private productService: ProductService
  ) { }

  @Effect()
  loadProducts: Observable<LoadSuccessAction> = this.actions.pipe(
    ofType(ProductActionType.Load),
    mergeMap(() => this.productService.getProducts().pipe(
      map(products => new LoadSuccessAction(products))
    ))
  );
}
