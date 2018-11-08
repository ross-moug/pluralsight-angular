import { initialState } from './user.state';
import {
  UserActionType,
  UserActions
} from './user.action';
import { UserState } from './user.state';

export function usersReducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionType.ToggleUserNameMask:
      return {
        ...state,
        maskUserName: action.payload,
      };
    // case UserActionType.SetCurrentUser:
    //   return {
    //     ...state,
    //     currentUser: action.payload,
    //   };
    default:
      return state;
  }
}
