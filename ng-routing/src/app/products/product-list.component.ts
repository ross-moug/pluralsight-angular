import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  listFilter: string;
  errorMessage: string;

  products: IProduct[];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) {
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products,
        error => this.errorMessage = <any>error);

    this.activatedRoute.queryParamMap.subscribe(
      params => {
        this.listFilter = params.get('filterBy') || '';
        this.showImage = params.get('showImage') === 'true';
      }
    );
  }
}
