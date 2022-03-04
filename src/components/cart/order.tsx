import { Dispatch, FormEvent, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCartItems } from "../../redux/actions/cartItemsActions";
import { RootReducerType } from "../../redux/reducers/rootReducer";
import cart from "./cart.module.scss";

export default function Order(props: { setShowModal: Dispatch<SetStateAction<boolean>>; total: number }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootReducerType) => state.cardItems);
  function handleBuySubmit(e: FormEvent) {
    e.preventDefault();
    if (cartItems.length) dispatch(buyCartItems());
    props.setShowModal(false);
  }
  const buttonClass = `order-form__submit--${cartItems.length ? "active" : "inactive"}`;
  const cartItemsArray = cartItems.map((item) => (
    <div className={cart["order-form__item"]} key={item.name}>
      <span className={cart["order-form__item-field"]}> Name: {item.name}</span>
      <span className={cart["order-form__item-field"]}> Amount: {item.amount}</span>
      <span className={cart["order-form__item-field"]}> Price: {item.price}$</span>
    </div>
  ));
  return (
    <form className={cart["order-form"]} onSubmit={handleBuySubmit}>
      {cartItemsArray.length ? (
        <div className={cart["order-form__items-container"]}>
          {cartItemsArray}
          <span>total:{props.total}</span>
        </div>
      ) : (
        <h2>No items, put something in cart!</h2>
      )}

      <button type="submit" className={`${cart["order-form__submit"]} ${cart[buttonClass]}`}>
        Buy games
      </button>
    </form>
  );
}
