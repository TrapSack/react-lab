import { IActionTypes, IGamesAction, IGamesState } from "../types/gamesTypes";

const initialState: IGamesState = {
  games: [],
};

// eslint-disable-next-line default-param-last
export default function gamesReducer(state: IGamesState = initialState, action: IGamesAction): IGamesState {
  switch (action.type) {
    case IActionTypes.GET_TOP_PRODUCTS:
      return { games: action.payload };
    case IActionTypes.SEARCH:
      return { games: action.payload };
    default:
      return state;
  }
}
