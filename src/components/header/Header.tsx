import NavLinks from "./navLinks";
import "./header.scss";

export default function Header() {
  setTimeout(() => {
    throw new Error("I crashed");
  }, 2000);
  return (
    <header className="header">
      <a href="/" className="header__logo">
        My Games Market
      </a>
      <NavLinks />
    </header>
  );
}
