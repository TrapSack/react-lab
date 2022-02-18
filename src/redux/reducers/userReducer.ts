import { IUserState, UserAction, IActionTypes } from "../types/types";

const initialState = {
  login: "",
  isAuth: true,
  description: "",
};

// eslint-disable-next-line
export default function userReducer(state: IUserState = initialState, action: UserAction): IUserState {
  switch (action.type) {
    case IActionTypes.LOGIN:
      return { login: action.payload.login, isAuth: true, description: action.payload.description };
    case IActionTypes.LOGOUT:
      return { login: "", isAuth: false, description: "" };
    case IActionTypes.ERROR:
      return { login: "", isAuth: false, error: "Incorrect login or password", description: "" };
    case IActionTypes.UPDATEINFO:
      return { login: action.payload.login, isAuth: true, description: action.payload.description };
    case IActionTypes.UPDATEPASSWORD:
      return { login: state.login, isAuth: true, description: state.description };
    case IActionTypes.REGISTER:
      return { login: action.payload.login, description: action.payload.description, isAuth: true };
    default:
      return state;
  }
}
