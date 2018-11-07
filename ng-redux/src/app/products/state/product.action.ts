import { Product } from './../product';
import { Action } from '@ngrx/store';

export enum ProductActionType {
  ToggleActionCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitialiseCurrentProduct = '[Product] Initialise Current Product',
}

export class ToggleProductCodeAction implements Action {
  readonly type: string = ProductActionType.ToggleActionCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProductAction implements Action {
  readonly type: string = ProductActionType.SetCurrentProduct;

  constructor(public payload: Product) {}
}

export class ClearCurrentProductAction implements Action {
  readonly type: string = ProductActionType.ClearCurrentProduct;
  payload: any;
}

export class InitialiseCurrentProductAction implements Action {
  readonly type: string = ProductActionType.InitialiseCurrentProduct;
  payload: any;
}

export type ProductActions = ToggleProductCodeAction
  | SetCurrentProductAction
  | ClearCurrentProductAction
  | InitialiseCurrentProductAction
;
