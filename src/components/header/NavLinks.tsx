import { useState } from "react";
import { NavLink } from "react-router-dom";
import { products, about, home } from "../../helpers/links";

export default function NavLinks() {
  const [DropdownShow, setDropdownShow] = useState<boolean>(false);
  const dropdownStyle = {
    display: DropdownShow ? "block" : "none",
  };

  function showDropdown() {
    setDropdownShow(true);
  }

  function hideDropdown() {
    setDropdownShow(false);
  }

  return (
    <nav className="navbar">
      <NavLink to={home} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}>
        Home
      </NavLink>
      <div className="navbar__dropdown" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
        <NavLink to={products} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}>
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
            className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}
          >
            Desktop
          </NavLink>
          <NavLink
            to={`${products}/playstation`}
            className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}
          >
            PlayStation 5
          </NavLink>
          <NavLink
            to={`${products}/xbox`}
            className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}
          >
            Xbox One
          </NavLink>
        </div>
      </div>
      <NavLink to={about} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}>
        About
      </NavLink>
    </nav>
  );
}
