export interface IAddOrderAction {
  type: IActionTypes.ADD_ORDER;
  payload: IOrder;
}
export interface IOrder {
  name: string;
  platform: string;
  orderDate: string;
  amount: number;
  price: number;
}

export interface IUpdateOrderAmount {
  type: IActionTypes.ADD_AMOUNT_TO_ORDER;
  payload: {
    name: string;
    amount?: number;
  };
}

export enum IActionTypes {
  ADD_ORDER = "USER/ADD_ORDER",
  ADD_AMOUNT_TO_ORDER = "USER/ADD_AMOUNT_TO_ORDER",
  GET_ORDERS = "USER/GET_ORDERS",
}

export interface IGetOrdersAction {
  type: IActionTypes.GET_ORDERS;
  payload: IOrder[];
}

export type OrderAction = IAddOrderAction | IUpdateOrderAmount | IGetOrdersAction;
