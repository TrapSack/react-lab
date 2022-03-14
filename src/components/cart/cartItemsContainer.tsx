/* eslint-disable jsx-a11y/control-has-associated-label */
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartItems } from "../../redux/actions/cartItemsActions";
import cart from "./cart.module.scss";
import CartItem from "./cartItem";
import { RootReducerType } from "../../redux/reducers/rootReducer";

export default function CartItemsContainer() {
  const dispatch = useDispatch();
  const cardItems = useSelector((state: RootReducerType) => state.cardItems);
  const mappedcardItems = useMemo(
    () =>
      cardItems.map((item) => (
        <CartItem
          name={item.name}
          date={item.orderDate}
          amount={item.amount}
          price={item.price}
          key={item.name}
          cover={item.cover}
        />
      )),
    [cardItems]
  );
  function handleClearCartClick() {
    dispatch(emptyCartItems());
  }
  return (
    <table className={cart["cart-items-container"]}>
      <tbody>
        <tr className={cart["cart-items-container__row"]}>
          <th />
          <th>Name</th>
          <th>Platform</th>
          <th>Order Date</th>
          <th>Amount</th>
          <th>Price($)</th>
        </tr>
        {mappedcardItems.length ? (
          <>
            {mappedcardItems}
            <tr>
              <td className={cart["cart-items-container__clear-cart-row"]}>
                <button
                  type="button"
                  className={cart["cart-items-container__clear-cart-btn"]}
                  onClick={handleClearCartClick}
                >
                  Clear cart
                </button>
              </td>
            </tr>
          </>
        ) : (
          <tr>
            <td>Nothing here yet!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
