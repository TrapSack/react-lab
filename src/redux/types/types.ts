export interface IUserState {
  login: string;
  isAuth: boolean;
}

export enum IActionTypes {
  LOGIN = "USER/LOGIN",
  LOGOUT = "USER/LOGOUT",
}

export type UserAction = ILoginAction | ILogoutAction;

export interface ILoginAction {
  type: IActionTypes.LOGIN;
  payload: string;
}

export interface ILogoutAction {
  type: IActionTypes.LOGOUT;
}
