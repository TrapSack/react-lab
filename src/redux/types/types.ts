export interface IUserState {
  login: string;
  isAuth: boolean;
  description: string;
  phone: string;
  adress: string;
  photo: string | ArrayBuffer | null;
  error?: string;
  orders: IOrder[];
}

export interface IOrder {
  name: string;
  platform: string;
  orderDate: string;
  amount: number;
  price: number;
}

export enum IActionTypes {
  LOGIN = "USER/LOGIN",
  REGISTER = "USER/REGISTER",
  LOGOUT = "USER/LOGOUT",
  ERROR = "USER/ERROR",
  UPDATEINFO = "USER/UPDATEINFO",
  UPDATEPASSWORD = "USER/UPDATEPASS",
  ADD_ORDER = "USER/ADD_ORDER",
  ADD_AMOUNT_TO_ORDER = "USER/ADD_AMOUNT_TO_ORDER",
  GET_ORDERS = "USER/GET_ORDERS",
}

export type UserAction =
  | ILoginAction
  | ILogoutAction
  | IErrorAction
  | IUpdateUserInfoAction
  | IUpdateUserPasswordAction
  | IRegisterAction
  | IAddOrderAction
  | IUpdateOrderAmount
  | IGetOrdersAction;

export interface ILoginAction {
  type: IActionTypes.LOGIN;
  payload: {
    login: string;
    description: string;
    phone: string;
    adress: string;
    photo: string | ArrayBuffer | null;
    orders: IOrder[];
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
    phone: string;
    adress: string;
    photo: string | ArrayBuffer | null;
    orders: IOrder[];
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
    phone: string;
    adress: string;
    photo: string | ArrayBuffer | null;
    orders: IOrder[];
  };
}

export interface IAddOrderAction {
  type: IActionTypes.ADD_ORDER;
  payload: IOrder;
}

export interface IUpdateOrderAmount {
  type: IActionTypes.ADD_AMOUNT_TO_ORDER;
  payload: {
    name: string;
    amount?: number;
  };
}

export interface IGetOrdersAction {
  type: IActionTypes.GET_ORDERS;
  payload: IOrder[];
}
