import { IActionTypes, IGame, IGamesAction } from "../types/gamesTypes";

const initialState: IGame[] = [];

// eslint-disable-next-line default-param-last
export default function gamesReducer(state: IGame[] = initialState, action: IGamesAction): IGame[] {
  switch (action.type) {
    case IActionTypes.GET_TOP_PRODUCTS:
      return action.payload;
    case IActionTypes.SEARCH:
      return action.payload;
    default:
      return state;
  }
}
