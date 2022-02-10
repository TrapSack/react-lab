/* eslint-disable react/jsx-no-bind */
import Modal from "@/elements/modal";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { products, about, home } from "../../helpers/links";
import LoginForm from "./loginForm";

interface IError {
  isError: boolean;
}

// create state with redirect route, after login redirect on this route
interface IState {
  currentUser: {
    login: string;
  };
  error: IError;
}

interface IProps {
  currentUser: {
    login: string;
  };
  setState: (
    state:
      | IState
      | ((prevState: Readonly<IState>, props: Readonly<unknown>) => IState | Pick<IState, keyof IState> | null)
      | Pick<IState, keyof IState>
      | null,
    callback?: (() => void) | undefined
  ) => void;
}

export default function NavLinks(props: IProps) {
  const [DropdownShow, setDropdownShow] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [redirectPath, setRedicectPath] = useState("");
  const navigate = useNavigate();
  const dropdownStyle = {
    display: DropdownShow ? "block" : "none",
  };
  function showDropdown() {
    setDropdownShow(true);
  }

  function hideDropdown() {
    setDropdownShow(false);
  }
  useEffect(() => {
    if (props.currentUser.login) navigate(redirectPath, { replace: true });
  }, [redirectPath]);
  function checkAuth(e) {
    const { href } = e.target;
    if (!props.currentUser.login) setShowModal(true);
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
          className={({ isActive }) =>
            `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`
          }
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
            className={({ isActive }) =>
              `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`
            }
            onClick={checkAuth}
          >
            Desktop
          </NavLink>
          <NavLink
            to={`${products}/playstation`}
            className={({ isActive }) =>
              `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`
            }
            onClick={checkAuth}
          >
            PlayStation 5
          </NavLink>
          <NavLink
            to={`${products}/xbox`}
            className={({ isActive }) =>
              `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`
            }
            onClick={checkAuth}
          >
            Xbox One
          </NavLink>
        </div>
      </div>
      <NavLink
        to={about}
        className={({ isActive }) => `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`}
        onClick={checkAuth}
      >
        About
      </NavLink>
      <Modal setIsOpen={setShowModal} open={showModal} title="Login">
        <LoginForm setState={props.setState} setIsOpen={setShowModal} redirectPath={redirectPath} />
      </Modal>
    </nav>
  );
}
