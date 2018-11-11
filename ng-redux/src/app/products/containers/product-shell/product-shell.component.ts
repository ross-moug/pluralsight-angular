import { ClearCurrentProductAction, DeleteProductAction, CreateProductAction, UpdateProductAction } from './../../state/product.action';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  select,
  Store
} from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getShowProductCode,
  getCurrentProduct,
  getProducts,
  getErrorMessage,
  SetCurrentProductAction,
  InitialiseCurrentProductAction,
  LoadAction,
  ToggleProductCodeAction,
  ProductState
} from '../../state';

import { Product } from '../../product';

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

  deleteProduct(id: number): void {
    this.store.dispatch(new DeleteProductAction(id));
  }

  createProduct(product: Product): void {
    this.store.dispatch(new CreateProductAction(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new UpdateProductAction(product));
  }

  clearSelectedProduct(): void {
    this.store.dispatch(new ClearCurrentProductAction());
  }
}
