import "./header.scss";
import { useContext } from "react";
import AuthorizationLinks from "./navbar/authorizationLinks";
import NavLinks from "./navbar/navbar";
import ProfileLinks from "./navbar/profileLinks";
import { Context } from "../../context";

interface IError {
  isError: boolean;
}

interface IState {
  error: IError;
  currentUser: {
    login: string;
  };
}

interface IProps {
  setState: (
    state:
      | IState
      | ((prevState: Readonly<IState>, props: Readonly<unknown>) => IState | Pick<IState, keyof IState> | null)
      | Pick<IState, keyof IState>
      | null,
    callback?: (() => void) | undefined
  ) => void;
}

export default function Header(props: IProps) {
  const { currentUser } = useContext(Context);
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <span> My Games Market</span>
      </a>
      <div className="header__links-container">
        <NavLinks currentUser={currentUser} setState={props.setState} />
        {currentUser.login ? (
          <ProfileLinks setState={props.setState} currentUser={currentUser} />
        ) : (
          <AuthorizationLinks setState={props.setState} />
        )}
      </div>
    </header>
  );
}
