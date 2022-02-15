export interface IUserState {
  login: string;
  isAuth: boolean;
  description: string;
  error?: string;
}

export enum IActionTypes {
  LOGIN = "USER/LOGIN",
  LOGOUT = "USER/LOGOUT",
  ERROR = "USER/ERROR",
  UPDATE = "USER/UPDATE",
}

export type UserAction = ILoginAction | ILogoutAction | IErrorAction | IUpdateAction;

export interface ILoginAction {
  type: IActionTypes.LOGIN;
  payload: {
    nickname: string;
    description: string;
  };
}

export interface ILogoutAction {
  type: IActionTypes.LOGOUT;
}

export interface IErrorAction {
  type: IActionTypes.ERROR;
  payload: string;
}

export interface IUpdateAction {
  type: IActionTypes.UPDATE;
  payload: {
    nickname: string;
    description: string;
  };
}
