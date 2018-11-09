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
        currentProduct: action.payload,
      };
    case ProductActionType.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null,
      };
    case ProductActionType.InitialiseCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        },
      };
    case ProductActionType.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        errorMessage: '',
      };
    case ProductActionType.LoadFail:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
