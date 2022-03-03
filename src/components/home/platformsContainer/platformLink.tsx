/* eslint-disable react/jsx-no-bind */
import changeNotification from "@/redux/actions/notificationActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { products } from "../../../helpers/links";

interface IPlatformLinkProps {
  cover: string;
  title: string;
  link: string;
}

export default function PlatformLink(props: IPlatformLinkProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootReducerType) => state.user);
  function checkAuth() {
    if (!user.isAuth) dispatch(changeNotification("danger", "Please, login or register first"));
  }
  return (
    <Link to={`${products}/${props.link}`} className="platform-link" id={props.link} onClick={checkAuth}>
      <img src={props.cover} alt={props.link} className="platform-link__logo" />
      <div className="platform-link__title">{props.title}</div>
    </Link>
  );
}
