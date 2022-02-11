import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers/rootReducer";

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(rootReducer, applyMiddleware());
