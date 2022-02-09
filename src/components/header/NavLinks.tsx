import Modal from "@/elements/modal";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { products, about, home } from "../../helpers/links";
import LoginForm from "./loginForm";

interface IError {
  isError: boolean;
}
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
  function checkAuth() {
    if (!props.currentUser.login) {
      setShowModal(true);
      navigate(home);
    }
  }

  return (
    <nav className="navbar">
      <NavLink
        to={home}
        className={({ isActive }) => `navbar__link ${isActive ? "navbar__link_active" : ""}`}
        onClick={() => {
          if (!props.currentUser.login) {
            setShowModal(true);
            navigate(home);
          }
        }}
      >
        Home
      </NavLink>
      <div className="navbar__dropdown" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
        <NavLink
          to={props.currentUser.login && products}
          className={({ isActive }) =>
            `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`
          }
          onClick={() => {
            if (!props.currentUser.login) {
              setShowModal(true);
              navigate(home, { replace: true });
            }
          }}
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
            to={props.currentUser.login && `${products}/desktop`}
            className={({ isActive }) =>
              `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`
            }
            onClick={() => {
              if (!props.currentUser.login) {
                setShowModal(true);
                navigate(home, { replace: true });
              }
            }}
          >
            Desktop
          </NavLink>
          <NavLink
            to={props.currentUser.login && `${products}/playstation`}
            className={({ isActive }) =>
              `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`
            }
            onClick={() => {
              if (!props.currentUser.login) {
                setShowModal(true);
                navigate(home, { replace: true });
              }
            }}
          >
            PlayStation 5
          </NavLink>
          <NavLink
            to={props.currentUser.login && `${products}/xbox`}
            className={({ isActive }) =>
              `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`
            }
            onClick={() => {
              if (!props.currentUser.login) {
                setShowModal(true);
                navigate(home, { replace: true });
              }
            }}
          >
            Xbox One
          </NavLink>
        </div>
      </div>
      <NavLink
        to={props.currentUser.login && about}
        className={({ isActive }) => `navbar__link ${isActive && props.currentUser.login ? "navbar__link_active" : ""}`}
        onClick={() => {
          if (!props.currentUser.login) {
            setShowModal(true);
            navigate(home, { replace: true });
          }
        }}
      >
        About
      </NavLink>
      <Modal setIsOpen={setShowModal} open={showModal}>
        <LoginForm setState={props.setState} setIsOpen={setShowModal} />
      </Modal>
    </nav>
  );
}
