import { IGame } from "./gamesTypes";

export enum TopProductsActionTypes {
  GET = "TOP_PRODUCTS/GET",
  CLEAR = "TOP_PRODUCTS/CLEAR",
}

export type ITopProductsAction = IGetTopProductsAction | IClearTopProductsAction;

export interface IGetTopProductsAction {
  type: TopProductsActionTypes.GET;
  payload: IGame[];
}

export interface IClearTopProductsAction {
  type: TopProductsActionTypes.CLEAR;
}
