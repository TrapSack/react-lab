import { IActionTypes, IGame, IGamesAction } from "../types/gamesTypes";

const initialState: IGame[] = [];

export default function gamesReducer(state: IGame[] = initialState, action: IGamesAction): IGame[] {
  switch (action.type) {
    case IActionTypes.GET_TOP_PRODUCTS:
      return action.payload;
    case IActionTypes.SEARCH:
      return action.payload;
    case IActionTypes.GET_GAMES:
      return action.payload;
    case IActionTypes.CLEAR_GAMES:
      return initialState;
    case IActionTypes.ADD_GAME:
      return [...state, action.payload];
    case IActionTypes.REMOVE_GAME:
      return state.filter((game) => game.id !== action.payload.id);
    case IActionTypes.UPDATE_GAME:
      return state.map((game) => {
        if (game.id === action.payload.id) game = action.payload;
        return game;
      });
    default:
      return state;
  }
}
