/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { IActionTypes, IGamesState } from "../types/gamesTypes";

export function getTopProducts() {
  return async (dispatch: (arg0: { type: IActionTypes; payload: IGamesState }) => void) => {
    const data = await axios.get("api/GetTopProducts");
    const parsedData = await data.data;
    dispatch({
      type: IActionTypes.GET_TOP_PRODUCTS,
      payload: parsedData,
    });
  };
}

export function searchGame(name: string) {
  return async (dispatch: (arg0: { type: IActionTypes; payload: IGamesState }) => void) => {
    const data = await axios.get(`api/search/${name}`);
    const parsedData = await data.data;
    dispatch({
      type: IActionTypes.GET_TOP_PRODUCTS,
      payload: parsedData,
    });
  };
}
