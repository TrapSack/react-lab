import axios from "axios";
import { IChangeNotificationAction } from "../types/notificationTypes";
import { IActionTypes, IErrorAction, ILoginAction, ILogoutAction } from "../types/types";
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
  userPhoto: string | ArrayBuffer | null
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
