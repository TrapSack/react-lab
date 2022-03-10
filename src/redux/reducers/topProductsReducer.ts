import { IGame } from "../types/gamesTypes";
import { ITopProductsAction, TopProductsActionTypes } from "../types/topProductsTypes";

const initialState = [] as IGame[];

// eslint-disable-next-line default-param-last
export default function topProductsReducer(state = initialState, action: ITopProductsAction): IGame[] {
  switch (action.type) {
    case TopProductsActionTypes.GET:
      return action.payload;
    case TopProductsActionTypes.CLEAR:
      return [];
    default:
      return state;
  }
}
