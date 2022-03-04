import { useSelector } from "react-redux";
import { IUserState } from "../../redux/types/types";
import header from "./header.module.scss";
import AuthorizationLinks from "./navbar/authorizationLinks";
import NavLinks from "./navbar/navbar";
import ProfileLinks from "./navbar/profileLinks";

export default function Header() {
  const user = useSelector((state: { user: IUserState }) => state.user);

  return (
    <header className={header.header}>
      <a href="/" className={header.header__logo}>
        My Games Market
      </a>
      <div className={header["header__links-container"]}>
        <NavLinks />
        {user.isAuth ? <ProfileLinks /> : <AuthorizationLinks />}
      </div>
    </header>
  );
}
