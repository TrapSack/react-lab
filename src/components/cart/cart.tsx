import Modal from "@/elements/modals/modal";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./cart.scss";
import CartItemsContainer from "./cartItemsContainer";
import Order from "./order";

export default function Cart() {
  const [showModal, setShowModal] = useState(false);
  const cartItems = useSelector((state: RootReducerType) => state.cardItems);
  const totalCost = useMemo(
    () => cartItems.reduce((acc, cur) => parseFloat((acc + cur.price).toFixed(2)), 0),
    [cartItems]
  );
  return (
    <div className="cart">
      <h2>Cart page</h2>
      <div>
        <CartItemsContainer />
        <span className="cart__total-cost">Total cost: {totalCost}$</span>
        <button
          type="button"
          className="cart__buy-btn"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Buy
        </button>
      </div>
      <Modal open={showModal} setIsOpen={setShowModal} title="Order details">
        <Order setShowModal={setShowModal} total={totalCost} />
      </Modal>
    </div>
  );
}
