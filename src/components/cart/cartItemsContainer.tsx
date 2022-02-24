import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";

export default function CartItemsContainer() {
  const cardItems = useSelector((state: RootReducerType) => state.cardItems);
  const mappedcardItems = cardItems.map((order) => (
    <CartItem name={order.name} date={order.orderDate} amount={order.amount} price={order.price} key={order.name} />
  ));
  return (
    <table className="cart-items-container">
      <tbody>
        <tr className="cart-items-container__row">
          <th>Name</th>
          <th>Platform</th>
          <th>Order Date</th>
          <th>Amount</th>
          <th>Price($)</th>
        </tr>
        {mappedcardItems}
      </tbody>
    </table>
  );
}
