import "./header.scss";
import NavLinks from "./navLinks";
import AuthorizationLinks from "./authorizationLinks";
import ProfileLinks from "./profileLinks";

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
          <ProfileLinks setState={props.setState} />
        ) : (
          <AuthorizationLinks setState={props.setState} />
        )}
      </div>
    </header>
  );
}
