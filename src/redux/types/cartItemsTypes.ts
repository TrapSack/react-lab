export interface IAddCartItemsAction {
  type: IActionTypes.ADD_CART_ITEM;
  payload: ICartItem;
}
export interface ICartItem {
  name: string;
  platform: string;
  orderDate: string;
  amount: number;
  price: number;
}

export interface IUpdateCartItemsAmount {
  type: IActionTypes.ADD_AMOUNT_TO_CART_ITEM;
  payload: {
    name: string;
    amount?: number;
  };
}

export enum IActionTypes {
  ADD_CART_ITEM = "USER/ADD_CART_ITEM",
  ADD_AMOUNT_TO_CART_ITEM = "USER/ADD_AMOUNT_TO_CART_ITEM",
  GET_CART_ITEMS = "USER/GET_CARD_ITEMS",
}

export interface IGetCartItemsAction {
  type: IActionTypes.GET_CART_ITEMS;
  payload: ICartItem[];
}

export type OrderAction = IAddCartItemsAction | IUpdateCartItemsAmount | IGetCartItemsAction;
