import { Product } from './../product';
import { Action } from '@ngrx/store';

export enum ProductActionType {
  ToggleActionCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitialiseCurrentProduct = '[Product] Initialise Current Product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail',
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

export class LoadAction implements Action {
  readonly type: string = ProductActionType.Load;
  payload: any;
}

export class LoadSuccessAction implements Action {
  readonly type: string = ProductActionType.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFailAction implements Action {
  readonly type: string = ProductActionType.LoadFail;

  constructor(public payload: string) {}
}

export type ProductActions = ToggleProductCodeAction
  | SetCurrentProductAction
  | ClearCurrentProductAction
  | InitialiseCurrentProductAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
;
