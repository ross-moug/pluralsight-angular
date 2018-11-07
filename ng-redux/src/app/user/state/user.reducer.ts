import { initialState } from './user.state';
import {
  TOGGLE_USER_NAME_MASK,
  ToggleUserNameMaskAction
} from './user.action';
import { UserState } from './user.state';


export function usersReducer(state: UserState = initialState, action: ToggleUserNameMaskAction): UserState {
  switch (action.type) {
    case TOGGLE_USER_NAME_MASK:
      return {
        ...state,
        maskUserName: action.payload,
      };
    default:
      return state;
  }
}
