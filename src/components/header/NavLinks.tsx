import { NavLink } from "react-router-dom";
import { products, about, home } from "../public/links";

export default function NavLinks() {
  return (
    <nav className="navbar">
      <NavLink to={home} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}>
        Home
      </NavLink>

      <NavLink to={products} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}>
        Products
      </NavLink>

      <NavLink to={about} className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}>
        About
      </NavLink>
    </nav>
  );
}
