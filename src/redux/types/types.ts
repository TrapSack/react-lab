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
  UPDATEINFO = "USER/UPDATEINFO",
  UPDATEPASSWORD = "USER/UPDATEPASS",
}

export type UserAction =
  | ILoginAction
  | ILogoutAction
  | IErrorAction
  | IUpdateUserInfoAction
  | IUpdateUserPasswordAction;

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

export interface IUpdateUserInfoAction {
  type: IActionTypes.UPDATEINFO;
  payload: {
    nickname: string;
    description: string;
  };
}

export interface IUpdateUserPasswordAction {
  type: IActionTypes.UPDATEPASSWORD;
}
