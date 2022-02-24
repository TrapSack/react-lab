import { IActionTypes, IOrder, OrderAction } from "../types/ordersTypes";

const initialState = [] as IOrder[];

// eslint-disable-next-line default-param-last
export default function orderReducer(state: IOrder[] = initialState, action: OrderAction): IOrder[] {
  switch (action.type) {
    case IActionTypes.ADD_ORDER:
      return [...state, action.payload];
    case IActionTypes.ADD_AMOUNT_TO_ORDER:
      return state.map((game) => {
        if (game.name === action.payload.name) {
          if (action.payload.amount) {
            // eslint-disable-next-line no-param-reassign
            game.amount = action.payload.amount;
          } else {
            // eslint-disable-next-line no-param-reassign
            game.amount++;
          }
        }
        return game;
      });
    case IActionTypes.GET_ORDERS:
      return action.payload;
    default:
      return state;
  }
}
