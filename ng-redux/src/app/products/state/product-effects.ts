import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  Observable,
  of
} from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators';
import { ProductService } from '../product.service';
import {
  LoadFailAction,
  LoadSuccessAction,
  ProductActionType,
  UpdateAction,
  UpdateFailAction,
  UpdateSuccessAction
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
  loadProducts: Observable<Action> = this.actions.pipe(
    ofType(ProductActionType.Load),
    mergeMap(() => this.productService.getProducts().pipe(
      map(products => new LoadSuccessAction(products)),
      catchError(err => of(new LoadFailAction(err)))
    ))
  );

  @Effect()
  updateProducts: Observable<Action> = this.actions.pipe(
    ofType(ProductActionType.Update),
    map((action: UpdateAction) => action.payload),
    mergeMap(product => this.productService.updateProduct(product).pipe(
      map(updatedProduct => new UpdateSuccessAction(updatedProduct)),
      catchError(err => of(new UpdateFailAction(err)))
    ))
  );
}
