import axios from "axios";
import { Dispatch } from "redux";
import { store } from "../store";
import { IActionTypes, IRemoveCartItemAction } from "../types/cartItemsTypes";
import changeNotification from "./notificationActions";

export function addCartItem(name: string, platform: string, price: number) {
  const today = new Date();
  return {
    type: IActionTypes.ADD_CART_ITEM,
    payload: {
      name,
      amount: 1,
      orderDate: today.toLocaleDateString("en-US"),
      platform,
      price,
    },
  };
}

export function updateCartItemAmount(name: string, amount?: number) {
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
    const data = await axios.get("api/getCartItems/", {
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
  return {
    type: IActionTypes.REMOVE_CART_ITEM,
    payload: {
      name,
    },
  };
}

export function emptyCartItems() {
  return async (dispatch: Dispatch) => {
    const data = await axios.post("api/buyCartItems", {
      cartItems: store.getState().cardItems,
      login: store.getState().user.login,
    });
    const { status } = data;
    if (status === 201) {
      dispatch(changeNotification("success", "You have successfully bought games!!"));
      dispatch({
        type: IActionTypes.EMPTY_CART_ITEMS,
      });
    } else {
      dispatch(changeNotification("danger", "An error has occured, try again later"));
      dispatch({
        type: IActionTypes.EMPTY_CART_ITEMS,
        payload: {
          error: "An error has occured",
        },
      });
    }
  };
}
