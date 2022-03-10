import { combineReducers } from "redux";
import { IGame } from "../types/gamesTypes";
import { INotificationState } from "../types/notificationTypes";
import { ICartItem } from "../types/cartItemsTypes";
import { IUserState } from "../types/types";
import gamesReducer from "./gamesReducer";
import notificationReducer from "./notificationReducer";
import orderReducer from "./cartItemsReducer";
import userReducer from "./userReducer";
import filterReducer from "./filterReducer";
import { IFilterState } from "../types/filterTypes";
import topProductsReducer from "./topProductsReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  games: gamesReducer,
  notification: notificationReducer,
  cardItems: orderReducer,
  filter: filterReducer,
  topProducts: topProductsReducer,
});

export type RootReducerType = {
  user: IUserState;
  games: IGame[];
  notification: INotificationState;
  cardItems: ICartItem[];
  filter: IFilterState;
  topProducts: IGame[];
};
