import {
  TOGGLE_PRODUCT_CODE,
  ToggleProductCodeAction
} from './product.action';
import { ProductState } from './product.state';

export function reducer(state: ProductState, action: ToggleProductCodeAction): ProductState {
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
