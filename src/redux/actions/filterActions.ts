import axios from "axios";
import { Dispatch } from "redux";
import { IActionTypes } from "../types/filterTypes";

export default function getFilter() {
  return async (dispatch: Dispatch) => {
    const filter = await axios.get("/api/filter");
    const resultFilter = await filter.data;
    dispatch({
      type: IActionTypes.GET_FILTER,
      payload: resultFilter,
    });
  };
}
