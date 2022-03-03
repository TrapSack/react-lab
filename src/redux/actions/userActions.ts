import axios from "axios";
import { Dispatch } from "redux";
import { IActionTypes, ILogoutAction } from "../types/types";
import changeNotification from "./notificationActions";
import { getCartItems } from "./cartItemsActions";
import { store } from "../store";

export function logOut(): ILogoutAction {
  axios.post("/api/updateCartItems/", { cartItems: store.getState().cardItems, login: store.getState().user.login });
  return {
    type: IActionTypes.LOGOUT,
  };
}

export function asyncLogIn(login: string, password: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await axios.post(`api/authorizeUser/`, { userName: login, userPass: password });
      const parsedData = await data.data;
      if (parsedData) {
        dispatch(getCartItems(login));
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
  console.log(userPhoto);
  return async (dispatch: Dispatch) => {
    const response = await axios.post(`/api/saveUser/`, {
      userNamePrev,
      userNameNew,
      userDescription,
      userPhone,
      userAdress,
      userPhoto,
    });
    const { status } = response;
    const parsedResponse: boolean = await response.data;
    if (status === 413) dispatch(changeNotification("danger", "Your photo is too large!"));
    else dispatch(changeNotification("success", "Successfully changed information"));
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
  return async (dispatch: Dispatch) => {
    await axios.post(`/api/changePassword/`, { userName: login, newPassword });
    dispatch(changeNotification("success", "Password has been changed"));
    dispatch({
      type: IActionTypes.UPDATEPASSWORD,
    });
  };
}

export function registerUser(login: string, password: string, phone: string, adress: string) {
  return async (dispatch: Dispatch) => {
    const data = await axios.post("/api/postUser", {
      userName: login,
      userPass: password,
      userPhone: phone,
      userAdress: adress,
    });
    const parsedData = data.data;
    dispatch(getCartItems(login));
    dispatch(changeNotification("success", "Registration successfull"));
    dispatch({
      type: IActionTypes.REGISTER,
      payload: parsedData,
    });
  };
}
