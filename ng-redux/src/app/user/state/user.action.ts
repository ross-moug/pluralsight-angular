import { Action } from '@ngrx/store';

import { User } from '../user';

export enum UserActionType {
  ToggleUserNameMask = '[User] Toggle User Name Mask',
  SetCurrentUser = '[User] Set Current User',
}

export class ToggleUserNameMaskAction implements Action {
  readonly type: string = UserActionType.ToggleUserNameMask;

  constructor(public payload: boolean) {}
}

export class SetCurrentUserAction implements Action {
  readonly type: string = UserActionType.SetCurrentUser;

  constructor(public payload: User) {}
}

export type UserActions = ToggleUserNameMaskAction
  | SetCurrentUserAction
;
