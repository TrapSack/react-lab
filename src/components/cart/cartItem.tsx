import { removeCartItem, updateCartItemAmount } from "@/redux/actions/cartItemsActions";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "../../helpers/useDebounce";

interface ICartItemProps {
  name: string;
  date: string;
  price: number;
  amount: number;
}

export default function CartItem(props: ICartItemProps) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(props.amount);
  function handleRemoveClick() {
    dispatch(removeCartItem(props.name));
  }
  function doAmountStateChange() {
    dispatch(updateCartItemAmount(props.name, amount));
  }
  const debouncedChangeAmount = debounce(doAmountStateChange, 300);
  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (parseInt(value, 10) > 0) {
      setAmount(parseInt(value, 10));
    } else {
      setAmount(1);
    }
  }
  useEffect(() => {
    if (amount === props.amount) return;
    debouncedChangeAmount();
  }, [amount]);
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
        <input type="text" name="amount" value={amount} className="cart-item__amount" onChange={handleAmountChange} />
      </td>
      <td className="cart-item__price">{props.price}</td>
      <td>
        <button type="button" className="cart-item__remove" onClick={handleRemoveClick}>
          &times;
        </button>
      </td>
    </tr>
  );
}
