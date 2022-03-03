import { IActionTypes, ICartItem, OrderAction } from "../types/cartItemsTypes";

const initialState = [] as ICartItem[];

// eslint-disable-next-line default-param-last
export default function cardItemsReducer(state: ICartItem[] = initialState, action: OrderAction): ICartItem[] {
  switch (action.type) {
    case IActionTypes.ADD_CART_ITEM:
      return [...state, action.payload];
    case IActionTypes.ADD_AMOUNT_TO_CART_ITEM:
      return state.map((game) => {
        if (game.name === action.payload.name) {
          if (action.payload.amount) {
            // eslint-disable-next-line no-param-reassign
            game.price = parseFloat(((game.price / game.amount) * action.payload.amount).toFixed(2));
            // eslint-disable-next-line no-param-reassign
            game.amount = action.payload.amount;
          } else {
            // eslint-disable-next-line no-param-reassign
            game.price = parseFloat((game.price + game.price / game.amount).toFixed(2));
            // eslint-disable-next-line no-param-reassign
            game.amount++;
          }
        }
        return game;
      });
    case IActionTypes.GET_CART_ITEMS:
      return action.payload;
    case IActionTypes.REMOVE_CART_ITEM:
      return state.filter((item) => item.name !== action.payload.name);
    case IActionTypes.BUY_CART_ITEMS:
      if (action.payload) return state;
      return [];
    case IActionTypes.EMPTY_CART_ITEMS:
      return [];
    default:
      return state;
  }
}
