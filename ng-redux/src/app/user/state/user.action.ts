import { Action } from '@ngrx/store';

export const TOGGLE_USER_NAME_MASK: string = 'TOGGLE_USER_NAME_MASK';

export class ToggleUserNameMaskAction implements Action {
  type: string =  TOGGLE_USER_NAME_MASK;
  payload: boolean;
}
