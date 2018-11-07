import {
  TOGGLE_PRODUCT_CODE,
  ToggleProductCodeAction
} from './product.action';
import { ProductState, initialState } from './product.state';

export function productsReducer(state: ProductState = initialState, action: ToggleProductCodeAction): ProductState {
  switch (action.type) {
    case TOGGLE_PRODUCT_CODE:
      return {
        ...state,
        showProductCode: action.payload,
      };
    default:
      return state;
  }
}
