import "./header.scss";
import NavLinks from "./navLinks";
// import UserLinks from "./userLinks";

export default function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <span> My Games Market</span>
      </a>
      <div className="header__links-container">
        <NavLinks />
        {/* <UserLinks /> */}
      </div>
    </header>
  );
}
