import axios from "axios";
import { IActionTypes, IAddOrderAction, IOrder, IUpdateOrderAmount } from "../types/ordersTypes";

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
  return async (dispatch: (arg0: { type: IActionTypes; payload: IOrder[] }) => void) => {
    const data = await axios.get("api/getOrders/");
    const parsedData = await data.data;
    dispatch({
      type: IActionTypes.GET_ORDERS,
      payload: parsedData,
    });
  };
}
