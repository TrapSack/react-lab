export interface IGame {
  id: string;
  name: string;
  rating: number;
  price: number;
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

export type IGamesAction = IGetTopProductsAction | ISearchGame;
