export interface IGame {
  id: string;
  name: string;
  rating: number;
  price: number;
  genre: string;
  releaseDate: string;
  cover: string;
  age: number;
  platforms: Array<string>;
  description: string;
}

export enum IActionTypes {
  GET_TOP_PRODUCTS = "GAMES/GETTOPPRODUCTS",
  SEARCH = "GAMES/SEARCH",
  GET_GAMES = "GAMES/GET",
  CLEAR_GAMES = "GAMES/CLEAR",
  ADD_GAME = "GAMES/ADD",
  REMOVE_GAME = "GAMES/REMOVE",
  UPDATE_GAME = "GAMES/UPDATE",
}

export interface IGetTopProductsAction {
  type: IActionTypes.GET_TOP_PRODUCTS;
  payload: IGame[];
}

export interface ISearchGame {
  type: IActionTypes.SEARCH;
  payload: IGame[];
}

export interface IGetGames {
  type: IActionTypes.GET_GAMES;
  payload: IGame[];
}

export type IGamesAction =
  | IGetTopProductsAction
  | ISearchGame
  | IGetGames
  | IClearGames
  | IAddGame
  | IRemoveGame
  | IUpdateGame;

export interface IClearGames {
  type: IActionTypes.CLEAR_GAMES;
}

export interface IAddGame {
  type: IActionTypes.ADD_GAME;
  payload: IGame;
}

export interface IRemoveGame {
  type: IActionTypes.REMOVE_GAME;
  payload: {
    id: string;
  };
}

export interface IUpdateGame {
  type: IActionTypes.UPDATE_GAME;
  payload: IGame
}
