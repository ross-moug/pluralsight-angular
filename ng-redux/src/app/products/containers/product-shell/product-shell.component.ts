import { getErrorMessage } from './../../state/product.selector';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {
  select,
  Store
} from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import {
  SetCurrentProductAction,
  InitialiseCurrentProductAction,
  LoadAction
} from '../../state/product.action';
import {
  getShowProductCode,
  getCurrentProduct,
  getProducts
} from '../../state/product.selector';

import { Product } from '../../product';
import { ToggleProductCodeAction } from '../../state/product.action';
import { ProductState } from '../../state/product.state';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<ProductState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadAction());

    this.errorMessage$ = this.store.pipe(select(getErrorMessage));

    this.products$ = this.store.pipe(select(getProducts));

    this.displayCode$ = this.store.pipe(select(getShowProductCode));

    this.selectedProduct$ = this.store.pipe(select(getCurrentProduct));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new ToggleProductCodeAction(value));
  }

  newProduct(): void {
    this.store.dispatch(new InitialiseCurrentProductAction());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new SetCurrentProductAction(product));
  }
}
