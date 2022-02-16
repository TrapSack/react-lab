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
    payload: {
      nickname,
      description: "",
    },
  };
}

export function asyncLogIn(nickname: string, password: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: boolean }) => void) => {
    const data = await axios.get(`api/authorizeUser/${nickname}/${password}`);
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
  return async (
    dispatch: (arg0: { type: IActionTypes; payload: { nickname: string; description: string } }) => void
  ) => {
    const response = await axios.post(`/api/saveUser/${userNamePrev}/${userNameNew}/${userDescription}`);
    const parsedResponse: boolean = await response.data;
    if (parsedResponse) {
      dispatch({
        type: IActionTypes.UPDATEINFO,
        payload: {
          nickname: userNameNew,
          description: userDescription,
        },
      });
    }
  };
}

export function changePassword(login: string, newPassword: string) {
  return async (dispatch: (arg0: { type: IActionTypes }) => void) => {
    await axios.post(`/api/changePassword/${login}/${newPassword}`);
    dispatch({
      type: IActionTypes.UPDATEPASSWORD,
    });
  };
}
