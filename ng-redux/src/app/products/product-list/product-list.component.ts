import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import {
  SetCurrentProductAction,
  InitialiseCurrentProductAction,
  LoadAction
} from './../state/product.action';
import {
  getShowProductCode,
  getCurrentProduct,
  getProducts,
  getErrorMessage
} from './../state/product.selector';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  select,
  Store
} from '@ngrx/store';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { ToggleProductCodeAction } from '../state/product.action';
import { ProductState } from '../state/product.state';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  private isComponentActive = true;

  constructor(private productService: ProductService,
              private store: Store<ProductState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadAction());

    this.products$ = this.store.pipe(select(getProducts));

    this.store.pipe(
      select(getShowProductCode),
      takeWhile(() => this.isComponentActive)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );

    this.store.pipe(
      select(getCurrentProduct),
      takeWhile(() => this.isComponentActive))
      .subscribe(currentProduct => this.selectedProduct = currentProduct);

    this.store.pipe(
      select(getErrorMessage),
      takeWhile(() => this.isComponentActive))
      .subscribe(errorMessage => this.errorMessage = errorMessage);
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
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
