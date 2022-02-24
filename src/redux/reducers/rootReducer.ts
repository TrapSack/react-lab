import { combineReducers } from "redux";
import { IGame } from "../types/gamesTypes";
import { INotificationState } from "../types/notificationTypes";
import { IOrder } from "../types/ordersTypes";
import { IUserState } from "../types/types";
import gamesReducer from "./gamesReducer";
import notificationReducer from "./notificationReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  user: userReducer,
  games: gamesReducer,
  notification: notificationReducer,
  orders: orderReducer,
});

export type RootReducerType = {
  user: IUserState;
  games: IGame[];
  notification: INotificationState;
  orders: IOrder[];
};
