import axios from "axios";
import { Dispatch } from "redux";
import { store } from "../store";
import { IActionTypes, IRemoveCartItemAction } from "../types/cartItemsTypes";
import changeNotification from "./notificationActions";

export function addCartItem(name: string, platform: string, price: number, cover: string) {
  return async (dispatch: Dispatch) => {
    const promiseItem = await axios.post("/api/addCartItem", {
      login: store.getState().user.login,
      itemName: name,
      itemPlatform: platform,
      itemPrice: price,
      itemCover: cover,
    });
    const item = await promiseItem.data;
    dispatch({
      type: IActionTypes.ADD_CART_ITEM,
      payload: item,
    });
  };
}

export function updateCartItemAmount(name: string, amount?: number) {
  axios.post("/api/updateCartItemAmount", { login: store.getState().user.login, itemName: name, amount });
  return {
    type: IActionTypes.ADD_AMOUNT_TO_CART_ITEM,
    payload: {
      name,
      amount,
    },
  };
}

export function getCartItems(login: string) {
  return async (dispatch: Dispatch) => {
    const data = await axios.get("api/cartItems/", {
      params: {
        login,
      },
    });
    const parsedData = await data.data;
    dispatch({
      type: IActionTypes.GET_CART_ITEMS,
      payload: parsedData,
    });
  };
}

export function removeCartItem(name: string): IRemoveCartItemAction {
  axios.delete("/api/cartItem", {
    params: {
      login: store.getState().user.login,
      name,
    },
  });
  return {
    type: IActionTypes.REMOVE_CART_ITEM,
    payload: {
      name,
    },
  };
}

export function buyCartItems() {
  return async (dispatch: Dispatch) => {
    const data = await axios.post("api/buyCartItems", {
      cartItems: store.getState().cardItems,
      login: store.getState().user.login,
    });
    const { status } = data;
    if (status === 201) {
      dispatch(changeNotification("success", "You have successfully bought games!!"));
      dispatch({
        type: IActionTypes.BUY_CART_ITEMS,
      });
    } else {
      dispatch(changeNotification("danger", "An error has occured, try again later"));
      dispatch({
        type: IActionTypes.BUY_CART_ITEMS,
        payload: {
          error: "An error has occured",
        },
      });
    }
  };
}

export function emptyCartItems() {
  axios.post("/api/clearCart", { login: store.getState().user.login });
  return {
    type: IActionTypes.EMPTY_CART_ITEMS,
  };
}
