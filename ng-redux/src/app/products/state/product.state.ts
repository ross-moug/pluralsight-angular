import { AppState } from './../../state/app.state';
import { Product } from './../product';

export interface AppState extends AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  errorMessage: string;
}

export const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  errorMessage: null,
};
