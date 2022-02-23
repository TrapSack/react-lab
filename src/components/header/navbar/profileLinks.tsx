import { cart, home, profile } from "@/helpers/links";
import { logOut } from "@/redux/actions/userActions";
import { IUserState } from "@/redux/types/types";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function ProfileLinks() {
  const user = useSelector((state: { user: IUserState }) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick() {
    dispatch(logOut());
    navigate(home, { replace: true });
  }

  return (
    <>
      <NavLink
        to={`${profile}`}
        className={({ isActive }) => `navbar__link ${isActive && user.isAuth ? "navbar__link_active" : ""}`}
      >
        {user.login}
      </NavLink>
      <NavLink
        to={`${cart}`}
        className={({ isActive }) => `navbar__link ${isActive && user.isAuth ? "navbar__link_active" : ""}`}
      >
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/19-e-commerce-currency-shopping/shopping-cart.png"
          alt="cart"
          className="navbar__cart-icon"
        />
      </NavLink>
      <button type="button" className="navbar__link navbar__link--btn" onClick={handleClick}>
        LogOut
      </button>
    </>
  );
}
