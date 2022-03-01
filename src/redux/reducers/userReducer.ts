import { IUserState, UserAction, IActionTypes } from "../types/types";

const initialState = {
  login: "",
  isAuth: true,
  description: "",
  phone: "",
  adress: "",
  photo: "",
  stuff: true,
};

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
        stuff: action.payload.stuff,
      };
    case IActionTypes.LOGOUT:
      return {
        login: "",
        isAuth: false,
        description: "",
        phone: "",
        adress: "",
        photo: "",
        stuff: false,
      };
    case IActionTypes.ERROR:
      return {
        login: "",
        isAuth: false,
        error: "Incorrect login or password",
        description: "",
        phone: "",
        adress: "",
        photo: "",
        stuff: false,
      };
    case IActionTypes.UPDATEINFO:
      return {
        login: action.payload.login,
        isAuth: true,
        description: action.payload.description,
        phone: action.payload.phone,
        adress: action.payload.adress,
        photo: action.payload.photo,
        stuff: state.stuff,
      };
    case IActionTypes.UPDATEPASSWORD:
      return state;
    case IActionTypes.REGISTER:
      return {
        login: action.payload.login,
        description: action.payload.description,
        isAuth: true,
        phone: action.payload.phone,
        adress: action.payload.adress,
        photo: action.payload.photo,
        stuff: false,
      };
    default:
      return state;
  }
}
