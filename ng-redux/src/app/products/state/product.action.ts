import { Product } from '../product';
import { Action } from '@ngrx/store';

export enum ProductActionType {
  ToggleActionCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitialiseCurrentProduct = '[Product] Initialise Current Product',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail',
  Update = '[Product] Update',
  UpdateSuccess = '[Product] Update Success',
  UpdateFail = '[Product] Update Fail',
  Create = '[Product] Create',
  CreateSuccess = '[Product] Create Success',
  CreateFail = '[Product] Create Fail',
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

export class UpdateAction implements Action {
  readonly type: string = ProductActionType.Update;

  constructor(public payload: Product) {}
}

export class UpdateSuccessAction implements Action {
  readonly type: string = ProductActionType.UpdateSuccess;

  constructor(public payload: Product) {}
}

export class UpdateFailAction implements Action {
  readonly type: string = ProductActionType.UpdateFail;

  constructor(public payload: string) {}
}

export class CreateAction implements Action {
  readonly type: string = ProductActionType.Create;

  constructor(public payload: Product) {}
}

export class CreateSuccessAction implements Action {
  readonly type: string = ProductActionType.CreateSuccess;

  constructor(public payload: Product) {}
}

export class CreateFailAction implements Action {
  readonly type: string = ProductActionType.CreateFail;

  constructor(public payload: string) {}
}

export type ProductActions = ToggleProductCodeAction
  | SetCurrentProductAction
  | ClearCurrentProductAction
  | InitialiseCurrentProductAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailAction
;
