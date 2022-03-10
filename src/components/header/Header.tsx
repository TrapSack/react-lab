import { useState } from "react";
import { useSelector } from "react-redux";
import { IUserState } from "../../redux/types/types";
import header from "./header.module.scss";
import AuthorizationLinks from "./navbar/authorizationLinks";
import NavLinks from "./navbar/navbar";
import ProfileLinks from "./navbar/profileLinks";

export default function Header() {
  const user = useSelector((state: { user: IUserState }) => state.user);
  const [toggleNavBar, setToggleNavBar] = useState(true);
  const linksContainerClass = `${header["header__links-container"]} ${
    toggleNavBar ? "" : header["header__links-container--hidden"]
  }`;
  return (
    <header className={header.header}>
      <div className={header["header__toggle-navbar-container"]}>
        <a href="/" className={header.header__logo}>
          My Games Market
        </a>
        <button
          type="button"
          className={header["header__toggle-navbar-btn"]}
          onClick={() => {
            setToggleNavBar(!toggleNavBar);
          }}
        >
          <img
            src={
              toggleNavBar
                ? "https://avatanplus.com/files/resources/original/5968a2c8f2ed115d40bbe123.png"
                : "https://cdn-icons-png.flaticon.com/512/467/467264.png"
            }
            alt=""
            height={30}
            className={header["header__toggle-navbar-icon"]}
          />
        </button>
      </div>
      <div className={linksContainerClass}>
        <NavLinks />
        {user.isAuth ? <ProfileLinks /> : <AuthorizationLinks />}
      </div>
    </header>
  );
}
