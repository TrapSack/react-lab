import { useSelector } from "react-redux";
import { IUserState } from "@/redux/types/types";
import "./header.scss";
import AuthorizationLinks from "./navbar/authorizationLinks";
import NavLinks from "./navbar/navbar";
import ProfileLinks from "./navbar/profileLinks";

export default function Header() {
  const user = useSelector((state: { user: IUserState }) => state.user);
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <span> My Games Market</span>
      </a>
      <div className="header__links-container">
        <NavLinks />
        {user.isAuth ? <ProfileLinks /> : <AuthorizationLinks />}
      </div>
    </header>
  );
}
