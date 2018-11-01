import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';

import * as _ from 'lodash';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string;

  private dataIsValid: { [key: string]: boolean } = {};

  private currentProduct: IProduct;
  private originalProduct: IProduct;

  get product(): IProduct {
    return this.currentProduct;
  }

  set product(value: IProduct) {
    this.currentProduct = value;
    this.originalProduct = Object.assign({}, value);
  }

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.snapshot.data.subscribe(
      data => this.onProductRetrieved(data['product'])
    );
  }

  onProductRetrieved(product: IProduct): void {
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(`${this.product.productName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveProduct(): void {
    if (this.isValid()) {
      this.productService.saveProduct(this.product)
        .subscribe(
          () => this.onSaveComplete(`${this.product.productName} was saved`),
          (error: any) => this.errorMessage = <any>error
        );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    this.reset();

    // Navigate back to the product list
    this.router.navigate(['products', this.product.id]);
  }

  isValid(path?: string): boolean {
    this.validate();

    if (path) {
      return this.dataIsValid[path];
    }

    return (this.dataIsValid && Object.keys(this.dataIsValid).every(key => this.dataIsValid[key]));
  }

  validate(): void {
    this.dataIsValid = {};

    if (this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode) {
      this.dataIsValid['info'] = true;
    }

    if (this.product.category &&
      this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    }
  }

  isDirty(): boolean {
    return !_.isEqual(this.currentProduct, this.originalProduct);
  }

  reset(): void{
    this.dataIsValid = null;
    this.currentProduct = null;
    this.originalProduct = null;
  }
}
