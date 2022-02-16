import { IUserState, UserAction, IActionTypes } from "../types/types";

const initialState = {
  login: "",
  isAuth: false,
  description: "",
};

// eslint-disable-next-line
export default function userReducer(state: IUserState = initialState, action: UserAction): IUserState {
  switch (action.type) {
    case IActionTypes.LOGIN:
      return { login: action.payload.nickname, isAuth: true, description: action.payload.description };
    case IActionTypes.LOGOUT:
      return { login: "", isAuth: false, description: "" };
    case IActionTypes.ERROR:
      return { login: "", isAuth: false, error: "Incorrect login or password", description: "" };
    case IActionTypes.UPDATEINFO:
      return { login: action.payload.nickname, isAuth: true, description: action.payload.description };
    case IActionTypes.UPDATEPASSWORD:
      return { login: state.login, isAuth: true, description: state.description };
    default:
      return state;
  }
}
