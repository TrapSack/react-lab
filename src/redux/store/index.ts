import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(rootReducer, compose(applyMiddleware(thunk), composeWithDevTools()));
