import { IUserState, UserAction, IActionTypes } from "../types/types";

const initialState = {
  login: "",
  isAuth: false,
};

// eslint-disable-next-line
export default function userReducer(state: IUserState = initialState, action: UserAction): IUserState {
  switch (action.type) {
    case IActionTypes.LOGIN:
      return { login: action.payload, isAuth: true };
    case IActionTypes.LOGOUT:
      return { login: "", isAuth: false };
    case IActionTypes.ERROR:
      return { login: "", isAuth: false, error: "Incorrect login or password" };
    default:
      return state;
  }
}
