import { useState } from "react";
import "./header.scss";
import NavLinks from "./navLinks";
// import UserLinks from "./userLinks";

export default function Header() {
  const [state, setState] = useState("hello");
  function handleClick() {
    setState(null);
  }
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <button onClick={handleClick} type="button">
          test error
        </button>
        <span> My Games Market {state.length}</span>
      </a>
      <div className="header__links-container">
        <NavLinks />
        {/* <UserLinks /> */}
      </div>
    </header>
  );
}
