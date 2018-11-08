import { User } from '../user';

export interface UserState {
  maskUserName: boolean;
  // currentUser: User;
}

export const initialState: UserState = {
  maskUserName: false,
  // currentUser: null,
};
