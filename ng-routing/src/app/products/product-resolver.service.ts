import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {
  Observable,
  of
} from 'rxjs';
import {
  catchError,
  map
} from 'rxjs/operators';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolverService implements Resolve<IProduct> {

  constructor(private router: Router,
              private productService: ProductService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    const id: any = route.paramMap.get('id');
    if (isNaN(id)) {
      console.log(`Product id was not a number: ${id}`);
      this.router.navigate(['/products']);
      return of(null);
    }

    return this.productService.getProduct(+id)
      .pipe(
        map(product => {
          if (product) {
            return product;
          }
          console.log(`Product was not found: ${id}`);
          this.router.navigate(['/products']);
          return null;
        }),
        catchError(this.handleError<IProduct>())
      );
  }

  private handleError<T>(): (err: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.log(`Retrieval error: ${error}`);
      this.router.navigate(['/products']);
      return of(null);
    };
  }
}
