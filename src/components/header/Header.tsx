import "./header.scss";
import AuthorizationLinks from "./navbar/authorizationLinks";
import NavLinks from "./navbar/navbar";
import ProfileLinks from "./navbar/profileLinks";

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

export default function Header(props: IProps) {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <span> My Games Market</span>
      </a>
      <div className="header__links-container">
        <NavLinks currentUser={props.currentUser} setState={props.setState} />
        {props.currentUser.login ? (
          <ProfileLinks setState={props.setState} currentUser={props.currentUser} />
        ) : (
          <AuthorizationLinks setState={props.setState} />
        )}
      </div>
    </header>
  );
}
