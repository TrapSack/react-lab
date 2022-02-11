import { IUserState, UserAction, IActionTypes } from "../types/types";

const initialState = {
  login: "",
  isAuth: false,
};

// eslint-disable-next-line
export const userReducer = (state: IUserState = initialState, action: UserAction): IUserState => {
  switch (action.type) {
    case IActionTypes.LOGIN:
      return { login: action.payload, isAuth: true };
    case IActionTypes.LOGOUT:
      return { login: "", isAuth: false };
    default:
      return state;
  }
};
