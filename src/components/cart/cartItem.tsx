interface ICartItemProps {
  name: string;
  date: string;
  price: number;
  amount: number;
}

export default function CartItem(props: ICartItemProps) {
  return (
    <tr className="cart-item card-items-container__row">
      <td className="cart-item__name">{props.name}</td>
      <td>
        <select name="item-platform" id="" className="cart-item__platform" defaultValue="desktop">
          <option value="desktop">PC</option>
          <option value="playstation">PS5</option>
        </select>
      </td>
      <td className="cart-item__order-date">{props.date}</td>
      <td>
        <input type="text" name="amount" value={props.amount} className="cart-item__amount" />
      </td>
      <td className="cart-item__price">{props.price}</td>
      <td>
        <button type="button" className="cart-item__remove">
          &times;
        </button>
      </td>
    </tr>
  );
}
