/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { IActionTypes, IGame } from "../types/gamesTypes";

export function getTopProducts() {
  return async (dispatch: (arg0: { type: IActionTypes; payload: IGame[] }) => void) => {
    const data = await axios.get("api/GetTopProducts");
    const parsedData = await data.data;
    dispatch({
      type: IActionTypes.GET_TOP_PRODUCTS,
      payload: parsedData,
    });
  };
}

export function searchGame(name: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: IGame[] }) => void) => {
    const data = await axios.get(`api/search/${name}`);
    const parsedData = await data.data;
    dispatch({
      type: IActionTypes.GET_TOP_PRODUCTS,
      payload: parsedData,
    });
  };
}

export function getGames(platform: string, genre: string, age: number, sortBy: string, orderBy: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: unknown }) => void) => {
    const data = await axios.get("api/getGames", { params: { platform, genre, age, sortBy, orderBy } });
    const parsedData = data.data;
    dispatch({
      type: IActionTypes.GET_GAMES,
      payload: parsedData,
    });
  };
}
