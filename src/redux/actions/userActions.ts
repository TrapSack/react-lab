import axios from "axios";
import { IActionTypes, ILoginAction, ILogoutAction } from "../types/types";

export function logOut(): ILogoutAction {
  return {
    type: IActionTypes.LOGOUT,
  };
}

export function logIn(nickname: string): ILoginAction {
  return {
    type: IActionTypes.LOGIN,
    payload: nickname,
  };
}

export function asyncLogIn(nickname: string, password: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: boolean }) => void) => {
    const data = await axios.get(`api/authorizeUser/${nickname}/${password}`);
    const parsedData: boolean = await data.data;
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
