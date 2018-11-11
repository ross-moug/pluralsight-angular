import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Product } from './../../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';
  @Input()
  errorMessage: string;
  @Input()
  displayCode: boolean;
  @Input()
  products: Product[];
  @Input()
  selectedProduct: Product;
  @Output()
  checked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  initialiseNewProduct: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  selected: EventEmitter<Product> = new EventEmitter<Product>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(): void {
    this.initialiseNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.selected.emit(product);
  }
}
