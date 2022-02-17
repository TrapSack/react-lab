import axios from "axios";
import { IActionTypes, ILogoutAction } from "../types/types";

export function logOut(): ILogoutAction {
  return {
    type: IActionTypes.LOGOUT,
  };
}

export function asyncLogIn(login: string, password: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: boolean }) => void) => {
    const data = await axios.post(`api/authorizeUser/`, { userName: login, userPass: password });
    const parsedData = await data.data;
    if (parsedData) {
      dispatch({
        type: IActionTypes.LOGIN,
        payload: parsedData,
      });
    } else {
      dispatch({
        type: IActionTypes.ERROR,
        payload: parsedData,
      });
    }
  };
}

export function saveProfile(userNamePrev: string, userNameNew: string, userDescription: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: { login: string; description: string } }) => void) => {
    const response = await axios.post(`/api/saveUser/`, { userNamePrev, userNameNew, userDescription });
    const parsedResponse: boolean = await response.data;
    if (parsedResponse) {
      dispatch({
        type: IActionTypes.UPDATEINFO,
        payload: {
          login: userNameNew,
          description: userDescription,
        },
      });
    }
  };
}

export function changePassword(login: string, newPassword: string) {
  return async (dispatch: (arg0: { type: IActionTypes }) => void) => {
    await axios.post(`/api/changePassword/`, { userName: login, newPassword });
    dispatch({
      type: IActionTypes.UPDATEPASSWORD,
    });
  };
}

export function registerUser(login: string, password: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: unknown }) => void) => {
    const data = await axios.post("/api/postUser", { userName: login, userPass: password });
    const parsedData = data.data;
    dispatch({
      type: IActionTypes.REGISTER,
      payload: { ...parsedData },
    });
  };
}
