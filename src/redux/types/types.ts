export interface IUserState {
  login: string;
  isAuth: boolean;
  description: string;
  error?: string;
}

export enum IActionTypes {
  LOGIN = "USER/LOGIN",
  REGISTER = "USER/REGISTER",
  LOGOUT = "USER/LOGOUT",
  ERROR = "USER/ERROR",
  UPDATEINFO = "USER/UPDATEINFO",
  UPDATEPASSWORD = "USER/UPDATEPASS",
}

export type UserAction =
  | ILoginAction
  | ILogoutAction
  | IErrorAction
  | IUpdateUserInfoAction
  | IUpdateUserPasswordAction
  | IRegisterAction;

export interface ILoginAction {
  type: IActionTypes.LOGIN;
  payload: {
    login: string;
    description: string;
  };
}

export interface ILogoutAction {
  type: IActionTypes.LOGOUT;
}

export interface IErrorAction {
  type: IActionTypes.ERROR;
  payload: boolean;
}

export interface IUpdateUserInfoAction {
  type: IActionTypes.UPDATEINFO;
  payload: {
    login: string;
    description: string;
  };
}

export interface IUpdateUserPasswordAction {
  type: IActionTypes.UPDATEPASSWORD;
}

export interface IRegisterAction {
  type: IActionTypes.REGISTER;
  payload: {
    login: string;
    description: string;
  };
}
