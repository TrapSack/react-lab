import { IUserState, UserAction, IActionTypes } from "../types/types";

const initialState = {
  login: "",
  isAuth: false,
  description: "",
  phone: "",
  adress: "",
  photo: "",
};

// eslint-disable-next-line
export default function userReducer(state: IUserState = initialState, action: UserAction): IUserState {
  switch (action.type) {
    case IActionTypes.LOGIN:
      return {
        login: action.payload.login,
        isAuth: true,
        description: action.payload.description,
        phone: action.payload.phone,
        adress: action.payload.adress,
        photo: action.payload.photo,
      };
    case IActionTypes.LOGOUT:
      return { login: "", isAuth: false, description: "", phone: "", adress: "", photo: "" };
    case IActionTypes.ERROR:
      return {
        login: "",
        isAuth: false,
        error: "Incorrect login or password",
        description: "",
        phone: "",
        adress: "",
        photo: "",
      };
    case IActionTypes.UPDATEINFO:
      return {
        login: action.payload.login,
        isAuth: true,
        description: action.payload.description,
        phone: action.payload.phone,
        adress: action.payload.adress,
        photo: action.payload.photo,
      };
    case IActionTypes.UPDATEPASSWORD:
      return {
        login: state.login,
        isAuth: true,
        description: state.description,
        phone: state.phone,
        adress: state.adress,
        photo: state.photo,
      };
    case IActionTypes.REGISTER:
      return {
        login: action.payload.login,
        description: action.payload.description,
        isAuth: true,
        phone: action.payload.phone,
        adress: action.payload.adress,
        photo: action.payload.photo,
      };
    default:
      return state;
  }
}
