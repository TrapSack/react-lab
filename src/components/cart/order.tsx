import { emptyCartItems } from "@/redux/actions/cartItemsActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Order(props: { setShowModal: Dispatch<SetStateAction<boolean>> }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootReducerType) => state.cardItems);
  function handleBuySubmit(e: FormEvent) {
    e.preventDefault();
    if (cartItems.length) dispatch(emptyCartItems());
    props.setShowModal(false);
  }
  const buttonClass = `order-form__submit--${cartItems.length ? "active" : "inactive"}`;
  const cartItemsArray = cartItems.map((item) => (
    <div className="order-form__item" key={item.name}>
      <span className="order-form__item-field"> Name: {item.name}</span>
      <span className="order-form__item-field"> Amount: {item.amount}</span>
      <span className="order-form__item-field"> Price: {item.price}$</span>
    </div>
  ));
  return (
    <form className="order-form" onSubmit={handleBuySubmit}>
      <div className="order-form__items-container">
        {cartItemsArray.length ? cartItemsArray : <h2>No items, put something in cart!</h2>}
      </div>
      <button type="submit" className={`order-form__submit ${buttonClass}`}>
        Buy games
      </button>
    </form>
  );
}
