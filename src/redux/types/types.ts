export interface IUserState {
  login: string;
  isAuth: boolean;
  error?: string;
}

export enum IActionTypes {
  LOGIN = "USER/LOGIN",
  LOGOUT = "USER/LOGOUT",
  ERROR = "USER/ERROR",
}

export type UserAction = ILoginAction | ILogoutAction | IErrorAction;

export interface ILoginAction {
  type: IActionTypes.LOGIN;
  payload: string;
}

export interface ILogoutAction {
  type: IActionTypes.LOGOUT;
}

export interface IErrorAction {
  type: IActionTypes.ERROR;
  payload: string;
}
