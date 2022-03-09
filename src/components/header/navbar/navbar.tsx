/* eslint-disable react/jsx-no-bind */
import Modal from "@/elements/modals/modal";
import { IUserState } from "@/redux/types/types";
import { BaseSyntheticEvent, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { products, about, home } from "../../../helpers/links";
import LoginForm from "../forms/loginForm";

export default function NavLinks() {
  const [DropdownShow, setDropdownShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [redirectPath, setRedicectPath] = useState("");
  const user = useSelector((state: { user: IUserState }) => state.user);
  const dropdownStyle = {
    display: DropdownShow ? "block" : "none",
  };
  function showDropdown() {
    setDropdownShow(true);
  }

  function hideDropdown() {
    setDropdownShow(false);
  }

  function checkAuth(e: BaseSyntheticEvent) {
    const { href } = e.target;
    if (!user.isAuth) setShowModal(true);
    setRedicectPath(
      `/${href
        .replace(/http:\/\//gm, "")
        .split("/")
        .slice(1)
        .join("/")}`
    );
  }

  return (
    <nav className="navbar">
      <NavLink to={home} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}>
        Home
      </NavLink>
      <div className="navbar__dropdown" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
        <NavLink
          to={products}
          className={({ isActive }) => `navbar__link ${isActive && user.isAuth ? "navbar__link_active" : ""}`}
          onClick={checkAuth}
        >
          Products
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Arrow-down.svg/1600px-Arrow-down.svg.png"
            alt=""
            className="navbar__dropdown-indicator"
          />
        </NavLink>
        <div className="navbar__dropdown-container" style={dropdownStyle}>
          <NavLink
            to={`${products}/desktop`}
            className={({ isActive }) => `navbar__link ${isActive && user.isAuth ? "navbar__link_active" : ""}`}
            onClick={checkAuth}
          >
            Desktop
          </NavLink>
          <NavLink
            to={`${products}/playstation`}
            className={({ isActive }) => `navbar__link ${isActive && user.isAuth ? "navbar__link_active" : ""}`}
            onClick={checkAuth}
          >
            PlayStation 5
          </NavLink>
          <NavLink
            to={`${products}/xbox`}
            className={({ isActive }) => `navbar__link ${isActive && user.isAuth ? "navbar__link_active" : ""}`}
            onClick={checkAuth}
          >
            Xbox One
          </NavLink>
        </div>
      </div>
      <NavLink
        to={about}
        className={({ isActive }) => `navbar__link ${isActive && user.isAuth ? "navbar__link_active" : ""}`}
        onClick={checkAuth}
      >
        About
      </NavLink>
      <Modal setIsOpen={setShowModal} open={showModal} title="Login">
        <LoginForm setIsOpen={setShowModal} redirectPath={redirectPath} />
      </Modal>
    </nav>
  );
}
