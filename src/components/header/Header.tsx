import NavLinks from "./navLinks";
import "./header.scss";
// import { useState } from "react";

export default function Header() {
  // const [state, setState] = useState("Hello");
  // function handleClick() {
  //   setState(null);
  // }
  return (
    <header className="header">
      <a href="/" className="header__logo">
        {/* <button type="button" onClick={handleClick}>
          Test
        </button> */}
        My Games Market
        {/* {state.length} */}
      </a>
      <NavLinks />
    </header>
  );
}
