import { IUserState, UserAction, IActionTypes } from "../types/types";

const initialState = {
  login: "trapsack",
  isAuth: true,
  description: "fsafsafsaf12412 siajSOIFJIO@!J%O!I@I IJFAASFJFSAJFSAJFSJSJ",
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
    case IActionTypes.UPDATE:
      return { login: action.payload.nickname, isAuth: true, description: action.payload.description };
    default:
      return state;
  }
}
