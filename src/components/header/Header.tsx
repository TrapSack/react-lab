import NavLinks from "./NavLinks";
import "./header.scss";

export default function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        My Games Market
      </a>
      <NavLinks />
    </header>
  );
}
