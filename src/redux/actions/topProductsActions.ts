import axios from "axios";
import { Dispatch } from "redux";
import { IGetTopProductsAction, TopProductsActionTypes } from "../types/topProductsTypes";

export function getTopProducts() {
  return async (dispatch: Dispatch<IGetTopProductsAction>) => {
    const data = await axios.get("api/GetTopProducts");
    const parsedData = await data.data;
    dispatch({
      type: TopProductsActionTypes.GET,
      payload: parsedData,
    });
  };
}

export function clearTopProducts() {
  return {
    type: TopProductsActionTypes.CLEAR,
  };
}
