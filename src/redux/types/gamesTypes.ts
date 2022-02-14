import { IGame } from "@/components/home/gamesContainer/interfaces";

export interface IGamesState {
  games: IGame[];
}

export enum IActionTypes {
  GET_TOP_PRODUCTS = "GAMES/GETTOPPRODUCTS",
  SEARCH = "GAMES/SEARCH",
}

export interface IGetTopProductsAction {
  type: IActionTypes.GET_TOP_PRODUCTS;
  payload: IGame[];
}

export interface ISearchGame {
  type: IActionTypes.SEARCH;
  payload: IGame[];
}

export type IGamesAction = IGetTopProductsAction | ISearchGame;
