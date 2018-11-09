import { Product } from '../product';
import {
  ProductActions,
  ProductActionType
} from './product.action';
import {
  ProductState,
  initialState
} from './product.state';

export function productsReducer(state: ProductState = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionType.ToggleActionCode:
      return {
        ...state,
        showProductCode: action.payload,
      };
    case ProductActionType.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id,
      };
    case ProductActionType.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null,
      };
    case ProductActionType.InitialiseCurrentProduct:
      return {
        ...state,
        currentProductId: 0,
      };
    case ProductActionType.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        errorMessage: '',
      };
    case ProductActionType.UpdateSuccess:
      const updatedProducts: Product[] = state.products.map(
        product => action.payload.id === product.id ? action.payload : product);
      return {
        ...state,
        products: updatedProducts,
        errorMessage: '',
      };
    case ProductActionType.LoadFail:
    case ProductActionType.UpdateFail:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
