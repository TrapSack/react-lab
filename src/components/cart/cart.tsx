import "./cart.scss";
import CartItemsContainer from "./cartItemsContainer";

export default function Cart() {
  return (
    <div className="cart">
      <h2>Cart page</h2>
      <form>
        <CartItemsContainer />
        <span className="cart__total-cost">Total cost: 30$</span>
        <button type="submit" className="cart__buy-btn">
          Buy
        </button>
      </form>
    </div>
  );
}
