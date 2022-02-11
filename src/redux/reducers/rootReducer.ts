import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  user: userReducer,
});
