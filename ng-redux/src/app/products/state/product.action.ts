import { Action } from '@ngrx/store';

export const TOGGLE_PRODUCT_CODE: string = 'TOGGLE_PRODUCT_CODE';

export class ToggleProductCodeAction implements Action {
  type: string =  TOGGLE_PRODUCT_CODE;
  payload: boolean;
}
