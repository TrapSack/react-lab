import { combineReducers } from "redux";
import { IGame } from "../types/gamesTypes";
import { INotificationState } from "../types/notificationTypes";
import { IUserState } from "../types/types";
import gamesReducer from "./gamesReducer";
import notificationReducer from "./notificationReducer";
import userReducer from "./userReducer";

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  user: userReducer,
  games: gamesReducer,
  notification: notificationReducer,
});

export type RootReducerType = {
  user: IUserState;
  games: IGame[];
  notification: INotificationState;
};
