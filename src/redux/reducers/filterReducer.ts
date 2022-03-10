import { IActionTypes, IFilterAction, IFilterState } from "../types/filterTypes";

const initialState: IFilterState = {
  genre: [],
  age: [],
};

// eslint-disable-next-line default-param-last
export default function filterReducer(state = initialState, action: IFilterAction): IFilterState {
  switch (action.type) {
    case IActionTypes.GET_FILTER:
      return action.payload;
    default:
      return state;
  }
}
