import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";

export default function OrdersContainer() {
  const orders = useSelector((state: RootReducerType) => state.user.orders);
  const mappedOrders = orders.map((order) => (
    <CartItem name={order.name} date={order.orderDate} amount={order.amount} price={order.price} key={order.name} />
  ));
  return (
    <table className="orders-container">
      <tbody>
        <tr className="orders-container__row">
          <th>Name</th>
          <th>Platform</th>
          <th>Order Date</th>
          <th>Amount</th>
          <th>Price($)</th>
        </tr>
        {mappedOrders}
      </tbody>
    </table>
  );
}
