import axios from "axios";
import { IChangeNotificationAction } from "../types/notificationTypes";
import {
  IActionTypes,
  IAddOrderAction,
  IErrorAction,
  ILoginAction,
  ILogoutAction,
  IOrder,
  IUpdateOrderAmount,
} from "../types/types";
import changeNotification from "./notificationActions";

export function logOut(): ILogoutAction {
  return {
    type: IActionTypes.LOGOUT,
  };
}

export function asyncLogIn(login: string, password: string) {
  return async (dispatch: (arg0: IChangeNotificationAction | ILoginAction | IErrorAction) => void) => {
    try {
      const data = await axios.post(`api/authorizeUser/`, { userName: login, userPass: password });
      const parsedData = await data.data;
      if (parsedData) {
        dispatch(changeNotification("success", "You successfully logged in"));
        dispatch({
          type: IActionTypes.LOGIN,
          payload: parsedData,
        });
      }
    } catch {
      dispatch({
        type: IActionTypes.ERROR,
        payload: false,
      });
    }
  };
}

export function saveProfile(
  userNamePrev: string,
  userNameNew: string,
  userDescription: string,
  userPhone: string,
  userAdress: string,
  userPhoto: string | ArrayBuffer | null,
  userOrders: IOrder[]
) {
  return async (
    dispatch: (
      arg0:
        | {
            type: IActionTypes;
            payload: {
              login: string;
              description: string;
              phone: string;
              adress: string;
              photo: string | ArrayBuffer | null;
              orders: IOrder[];
            };
          }
        | IChangeNotificationAction
    ) => void
  ) => {
    const response = await axios.post(`/api/saveUser/`, {
      userNamePrev,
      userNameNew,
      userDescription,
      userPhone,
      userAdress,
      userPhoto,
      userOrders,
    });
    const parsedResponse: boolean = await response.data;
    dispatch(changeNotification("success", "Successfully changed information"));
    if (parsedResponse) {
      dispatch({
        type: IActionTypes.UPDATEINFO,
        payload: {
          login: userNameNew,
          description: userDescription,
          phone: userPhone,
          adress: userAdress,
          photo: userPhoto,
          orders: userOrders,
        },
      });
    }
  };
}

export function changePassword(login: string, newPassword: string) {
  return async (dispatch: (arg0: { type: IActionTypes } | IChangeNotificationAction) => void) => {
    await axios.post(`/api/changePassword/`, { userName: login, newPassword });
    dispatch(changeNotification("success", "Password has been changed"));
    dispatch({
      type: IActionTypes.UPDATEPASSWORD,
    });
  };
}

export function registerUser(login: string, password: string, phone: string, adress: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: unknown } | IChangeNotificationAction) => void) => {
    const data = await axios.post("/api/postUser", {
      userName: login,
      userPass: password,
      userPhone: phone,
      userAdress: adress,
    });
    const parsedData = data.data;
    console.log(parsedData);
    dispatch(changeNotification("success", "Registration successfull"));
    dispatch({
      type: IActionTypes.REGISTER,
      payload: parsedData,
    });
  };
}

export function addOrder(name: string, platform: string, price: number, login: string): IAddOrderAction {
  const today = new Date();
  axios.post("/api/addOrder/", {
    login,
    order: {
      name,
      amount: 1,
      orderDate: today.toLocaleDateString("en-US"),
      platform,
      price,
    },
  });
  return {
    type: IActionTypes.ADD_ORDER,
    payload: {
      name,
      amount: 1,
      orderDate: today.toLocaleDateString("en-US"),
      platform,
      price,
    },
  };
}

export function updateOrderAmount(name: string, login: string, amount?: number): IUpdateOrderAmount {
  axios.post("/api/updateOrder/", {
    orderName: name,
    login,
    amount,
  });
  return {
    type: IActionTypes.ADD_AMOUNT_TO_ORDER,
    payload: {
      name,
      amount,
    },
  };
}

export function getOrders() {
  return async (dispatch) => {
    const data = await axios.get("api/getOrders/");
    const parsedData = await data.data;
    return {
      type: IActionTypes.GET_ORDERS,
      payload: parsedData,
    };
  };
}
