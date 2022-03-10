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
  cover: string;
}

export interface IUpdateCartItemsAmount {
  type: IActionTypes.ADD_AMOUNT_TO_CART_ITEM;
  payload: {
    name: string;
    amount?: number;
  };
}

export const enum IActionTypes {
  ADD_CART_ITEM = "CART_ITEM/ADD",
  ADD_AMOUNT_TO_CART_ITEM = "CART_ITEM/ADD_AMOUNT",
  GET_CART_ITEMS = "CART_ITEM/GET",
  REMOVE_CART_ITEM = "CART_ITEM/REMOVE",
  BUY_CART_ITEMS = "CART_ITEM/BUY",
  EMPTY_CART_ITEMS = "CART_ITEM/EMPTY",
}

export interface IGetCartItemsAction {
  type: IActionTypes.GET_CART_ITEMS;
  payload: ICartItem[];
}

export type OrderAction =
  | IAddCartItemsAction
  | IUpdateCartItemsAmount
  | IGetCartItemsAction
  | IRemoveCartItemAction
  | IBuyCartItemsAction
  | IEmptyCartItemsAction;

export interface IRemoveCartItemAction {
  type: IActionTypes.REMOVE_CART_ITEM;
  payload: {
    name: string;
  };
}

export interface IBuyCartItemsAction {
  type: IActionTypes.BUY_CART_ITEMS;
  payload?: {
    error: string;
  };
}

export interface IEmptyCartItemsAction {
  type: IActionTypes.EMPTY_CART_ITEMS;
}
