export interface IFilterState {
  genre: string[];
  age: number[];
}

export const enum IActionTypes {
  GET_FILTER = "FILTER/GET",
  ADD_GENRE = "FILTER/ADD_GENRE",
}

export type IFilterAction = IGetFilterAction;

interface IGetFilterAction {
  type: IActionTypes.GET_FILTER;
  payload: IFilterState;
}
