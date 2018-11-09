import * as root from './../../state/app.state';
import { Product } from '../product';

export interface AppState extends root.AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  errorMessage: string;
}

export const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  errorMessage: null,
};
