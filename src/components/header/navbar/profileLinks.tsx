import { home } from "@/helpers/links";
import { useNavigate } from "react-router-dom";

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
  currentUser: {
    login: string;
  };
}

export default function ProfileLinks(props: IProps) {
  const navigate = useNavigate();
  function handleClick() {
    props.setState({
      error: { isError: false },
      currentUser: { login: "" },
    });
    navigate(home, { replace: true });
  }

  return (
    <>
      <button type="button" className="navbar__link navbar__link--btn">
        {props.currentUser.login}
      </button>
      <button type="button" className="navbar__link navbar__link--btn" onClick={handleClick}>
        LogOut
      </button>
    </>
  );
}
