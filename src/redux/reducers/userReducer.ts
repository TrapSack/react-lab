import { IUserState, UserAction, IActionTypes, IOrder } from "../types/types";

const initialState = {
  login: "untitled",
  isAuth: true,
  description: "",
  phone: "",
  adress: "",
  photo: "",
  orders: [] as IOrder[],
};

// eslint-disable-next-line
export default function userReducer(state: IUserState = initialState, action: UserAction): IUserState {
  switch (action.type) {
    case IActionTypes.LOGIN:
      return {
        login: action.payload.login,
        isAuth: true,
        description: action.payload.description,
        phone: action.payload.phone,
        adress: action.payload.adress,
        photo: action.payload.photo,
        orders: action.payload.orders,
      };
    case IActionTypes.LOGOUT:
      return { login: "", isAuth: false, description: "", phone: "", adress: "", photo: "", orders: [] };
    case IActionTypes.ERROR:
      return {
        login: "",
        isAuth: false,
        error: "Incorrect login or password",
        description: "",
        phone: "",
        adress: "",
        photo: "",
        orders: [],
      };
    case IActionTypes.UPDATEINFO:
      return {
        login: action.payload.login,
        isAuth: true,
        description: action.payload.description,
        phone: action.payload.phone,
        adress: action.payload.adress,
        photo: action.payload.photo,
        orders: action.payload.orders,
      };
    case IActionTypes.UPDATEPASSWORD:
      return {
        login: state.login,
        isAuth: true,
        description: state.description,
        phone: state.phone,
        adress: state.adress,
        photo: state.photo,
        orders: state.orders,
      };
    case IActionTypes.REGISTER:
      return {
        login: action.payload.login,
        description: action.payload.description,
        isAuth: true,
        phone: action.payload.phone,
        adress: action.payload.adress,
        photo: action.payload.photo,
        orders: action.payload.orders,
      };
    case IActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case IActionTypes.ADD_AMOUNT_TO_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.name === action.payload.name) {
            if (action.payload.amount) {
              // eslint-disable-next-line no-param-reassign
              order.amount = action.payload.amount;
            } else {
              // eslint-disable-next-line no-param-reassign
              order.amount++;
            }
          }
          return order;
        }),
      };
    case IActionTypes.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
}
