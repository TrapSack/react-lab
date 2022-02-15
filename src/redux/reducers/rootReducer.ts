import { combineReducers } from "redux";
import { IGamesState } from "../types/gamesTypes";
import { IUserState } from "../types/types";
import gamesReducer from "./gamesReducer";
import userReducer from "./userReducer";

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  user: userReducer,
  games: gamesReducer,
});

export type RootReducerType = {
  user: IUserState;
  games: IGamesState;
};
