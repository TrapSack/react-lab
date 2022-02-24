import axios from "axios";
import { IActionTypes, ICartItem } from "../types/cartItemsTypes";

export function addCartItem(name: string, platform: string, price: number, login: string) {
  return async (
    dispatch: (arg0: {
      type: IActionTypes;
      payload: { name: string; amount: number; orderDate: string; platform: string; price: number };
    }) => void
  ) => {
    const today = new Date();
    const data = await axios.post("/api/addCartItem/", {
      login,
      order: {
        name,
        amount: 1,
        orderDate: today.toLocaleDateString("en-US"),
        platform,
        price,
      },
    });
    dispatch({
      type: IActionTypes.ADD_CART_ITEM,
      payload: {
        name,
        amount: 1,
        orderDate: today.toLocaleDateString("en-US"),
        platform,
        price,
      },
    });
  };
}

export function updateCartItemAmount(name: string, login: string, amount?: number) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: { name: string; amount: number } }) => void) => {
    const data = await axios.post("/api/updateCartItem/", {
      orderName: name,
      login,
      amount,
    });
    dispatch({
      type: IActionTypes.ADD_AMOUNT_TO_CART_ITEM,
      payload: {
        name,
        amount,
      },
    });
  };
}

export function getcardItems(login: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: ICartItem[] }) => void) => {
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
