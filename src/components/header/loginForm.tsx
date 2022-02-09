import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITempUser } from "./interfaces";

interface IError {
  isError: boolean;
}

interface IState {
  currentUser: {
    login: string;
  };
  error: IError;
}

interface IFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setState: (
    state:
      | IState
      | ((prevState: Readonly<IState>, props: Readonly<unknown>) => IState | Pick<IState, keyof IState> | null)
      | Pick<IState, keyof IState>
      | null,
    callback?: (() => void) | undefined
  ) => void;
}

export default function loginForm(props: IFormProps) {
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
  }));
  const [error, setError] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios.get(`api/authorizeUser/${tempUser.login}/${tempUser.password}`).then((res) => {
      if (res.data) {
        props.setState({
          error: { isError: false },
          currentUser: { login: tempUser.login },
        });
        props.setIsOpen(false);
      }
      setError(res.data ? "" : "Incorrect login or password");
    });
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <div className="modal__title-wrapper">
        <span className="modal__title">Login</span>
        <button
          className="modal__close-btn"
          type="button"
          onClick={() => {
            setTempUser({
              login: "",
              password: "",
              confirmPassword: "",
            });
            props.setIsOpen(false);
          }}
        >
          &times;
        </button>
      </div>
      <label htmlFor="login" className="modal__form-option">
        Login
        <input
          type="text"
          placeholder="Login"
          name="login"
          className="modal__input"
          value={tempUser.login}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="password" className="modal__form-option">
        Password
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="modal__input"
          onChange={handleChange}
          value={tempUser.password}
        />
      </label>
      <span className="modal__input-error">{error}</span>
      <button type="submit" className="modal__submit">
        Login
      </button>
    </form>
  );
}
