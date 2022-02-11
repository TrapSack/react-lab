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
