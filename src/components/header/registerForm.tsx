import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ITempUser } from "./interfaces";
import { valiDatePassword } from "./validators";
import debounce from "../../helpers/useDebounce";

interface IError {
  isError: boolean;
}

interface IState {
  error: IError;
  currentUser: {
    login: string;
  };
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

export default function RegisterForm(props: IFormProps) {
  const [error, setError] = useState({
    loginInputError: "",
    PasswordInputError: "",
    PasswordRepeatError: "",
  });
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
    confirmPassword: "",
  }));
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let checkOnSubmit = tempUser.login.length > 0;
    Object.keys(error).forEach((err: string) => {
      if (error[err] === "") return err; // ERROR? ?? ? ? ? ?? ? ? ? https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript/55012175#55012175
      checkOnSubmit = false;
      return err;
    });
    if (checkOnSubmit) {
      axios.post(`api/postUser/${tempUser.login}/${tempUser.password}`).then((res) => {
        if (res.data) {
          props.setState({
            error: { isError: false },
            currentUser: { login: tempUser.login },
          });
        }
      });
    }
  }
  function validateUserLogin() {
    axios.get(`api/getUser/${tempUser.login}`).then((res) => {
      setError((prev) => ({
        ...prev,
        loginInputError: tempUser.login === res.data && tempUser.login.length !== 0 ? "User Already exists" : "",
      }));
    });
  }
  const debouncedValidate = debounce(validateUserLogin, 300);
  useEffect(() => {
    debouncedValidate();
  }, [tempUser.login]);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "password":
        setError((prev) => ({
          ...prev,
          PasswordInputError:
            valiDatePassword(value) || value.length === 0 ? "" : "Password length should be more than 6 sybmols",
        }));
        break;
      case "confirmPassword":
        setError((prev) => ({
          ...prev,
          PasswordRepeatError: value === tempUser.password ? "" : "Passwords don`t match",
        }));
        break;
      default:
        break;
    }
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <div className="modal__title-wrapper">
        <span className="modal__title">Register</span>
        <button
          className="modal__close-btn"
          type="button"
          onClick={() => {
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
          onChange={handleChange}
          value={tempUser.login}
        />
      </label>
      <span className="modal__input-error">{error.loginInputError}</span>
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
      <span className="modal__input-error">{error.PasswordInputError}</span>
      <label htmlFor="password" className="modal__form-option">
        Confirm
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          className="modal__input"
          onChange={handleChange}
          value={tempUser.confirmPassword}
        />
      </label>
      <span className="modal__input-error">{error.PasswordRepeatError}</span>
      <button type="submit" className="modal__submit">
        Register
      </button>
    </form>
  );
}
