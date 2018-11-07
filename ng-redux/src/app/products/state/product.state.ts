import { AppState } from './../../state/app.state';
import { Product } from './../product';

export interface AppState extends AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  prodcuts: Product[];
}

export const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  prodcuts: []
};
